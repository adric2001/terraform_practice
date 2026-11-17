"""
Unit tests for backend lambda_handler logic.
"""

import unittest
from unittest.mock import MagicMock, patch
import json
import os
import sys

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import lambda_handler

class TestLambdaHandler(unittest.TestCase):

    def test_load_all_bundled_questions(self):
        questions = lambda_handler.load_all_bundled_questions()
        self.assertGreater(len(questions), 200, "Should load at least 200 questions across exams")
        q1 = questions[0]
        self.assertIn("id", q1)
        self.assertIn("question", q1)
        self.assertIn("domain", q1)
        self.assertIn("answer", q1)

    @patch("lambda_handler.questions_table")
    def test_handle_get_weak_areas(self, mock_q_table):
        # Mock query return simulating the user's test result (Domain 4: 50%, Domain 8: 64%)
        mock_q_table.query.return_value = {
            "Items": [
                {"question_id": "q1", "domain": "Domain 4: Use Terraform Outside the Core Workflow", "attempts": 2, "correct_count": 1, "last_result": "INCORRECT"},
                {"question_id": "q2", "domain": "Domain 8: Read, Generate, and Modify Configuration", "attempts": 3, "correct_count": 1, "last_result": "INCORRECT"},
                {"question_id": "q3", "domain": "Domain 1: Understand Infrastructure as Code (IaC) Concepts", "attempts": 2, "correct_count": 2, "last_result": "CORRECT"}
            ]
        }
        resp = lambda_handler.handle_get_weak_areas("test_user_123")
        self.assertEqual(resp["statusCode"], 200)
        body = json.loads(resp["body"])
        self.assertTrue(body["has_weak_areas"])
        weak_domain_names = [d["domain"] for d in body["weak_domains"]]
        self.assertIn("Domain 4: Use Terraform Outside the Core Workflow", weak_domain_names)
        self.assertIn("Domain 8: Read, Generate, and Modify Configuration", weak_domain_names)
        
        # Verify recommended labs mapping
        d4_info = next(d for d in body["weak_domains"] if "Domain 4" in d["domain"])
        self.assertTrue(len(d4_info["recommended_labs"]) > 0)
        lab_ids = [l["id"] for l in d4_info["recommended_labs"]]
        self.assertIn("11-lifecycle-rules", lab_ids)

    @patch("lambda_handler.questions_table")
    def test_handle_post_custom_exam_weak_domains(self, mock_q_table):
        mock_q_table.query.return_value = {
            "Items": [
                {"question_id": "q1", "domain": "Domain 4: Use Terraform Outside the Core Workflow", "attempts": 2, "correct_count": 0, "last_result": "INCORRECT"}
            ]
        }
        body = {"mode": "weak_domains", "count": 5}
        resp = lambda_handler.handle_post_custom_exam("test_user_123", body)
        self.assertEqual(resp["statusCode"], 200)
        exam = json.loads(resp["body"])
        self.assertEqual(len(exam["questions"]), 5)
        for q in exam["questions"]:
            self.assertEqual(q["domain"], "Domain 4: Use Terraform Outside the Core Workflow")

if __name__ == "__main__":
    unittest.main()
