export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "ezshare-posts-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://9nnfhnqbji.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_n9xwviCYJ",
    APP_CLIENT_ID: "53s2cmfu067almlleb3fu94hgn",
    IDENTITY_POOL_ID: "us-east-1:9f470628-62ef-47f6-904f-6fa47ba4d459"
  }
};