// Configuration injected during AWS deployment
window.PORTAL_CONFIG = {
  apiUrl: "%%API_ENDPOINT%%",
  cognitoUserPoolId: "%%COGNITO_USER_POOL_ID%%",
  cognitoClientId: "%%COGNITO_CLIENT_ID%%",
  awsRegion: "%%AWS_REGION%%"
};
