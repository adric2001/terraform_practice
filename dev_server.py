#!/usr/bin/env python3
"""
Local Full-Stack Mock Server for Terraform Associate (004) Portal
Serves the web portal on http://localhost:8000 and mocks Cognito & DynamoDB APIs locally.
"""

import http.server
import socketserver
import json
import os
import sys
import time

PORT = 8000
PORTAL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "portal")

# Local Mock State
mock_state = {
    "sessions": [],
    "questions": {}
}

class PortalHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PORTAL_DIR, **kwargs)

    def do_GET(self):
        if self.path.startswith("/api/profile"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            
            # Diagnostic profile with baseline weak areas
            resp = {
                "user_id": "local_dev_user",
                "total_available_questions": 250,
                "questions_attempted": len(mock_state["questions"]) or 25,
                "coverage_percentage": 10.0,
                "overall_accuracy": 72.0,
                "readiness_score": 74,
                "verdict": "MARGINAL PASS",
                "weak_domains": [
                    {"domain": "Domain 4: Use Terraform Outside the Core Workflow", "accuracy": 50.0},
                    {"domain": "Domain 8: Read, Generate, and Modify Configuration", "accuracy": 64.0}
                ]
            }
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        elif self.path.startswith("/api/weak-areas"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            resp = {
                "has_weak_areas": True,
                "weak_domains": [
                    {
                        "domain": "Domain 4: Use Terraform Outside the Core Workflow",
                        "accuracy": 50.0,
                        "recommended_labs": [{"id": "11-lifecycle-rules", "title": "Lifecycle Rules"}]
                    },
                    {
                        "domain": "Domain 8: Read, Generate, and Modify Configuration",
                        "accuracy": 64.0,
                        "recommended_labs": [{"id": "03-variables-and-outputs", "title": "Variables"}]
                    }
                ]
            }
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/sessions"):
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length).decode("utf-8"))
            mock_state["sessions"].append(body)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps({"message": "Session recorded locally", "session_id": "local_sess_1"}).encode("utf-8"))
            return

        super().do_POST()

if __name__ == "__main__":
    print(f"🚀 Launching Terraform Practice Portal local server on http://localhost:{PORT}")
    print(f"📂 Serving static files from: {PORTAL_DIR}")
    print("Press Ctrl+C to stop.")
    
    with socketserver.TCPServer(("", PORT), PortalHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
