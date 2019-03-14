import Amplify from "aws-amplify";
import AwsConfig from "./AwsConfig";

const AwsSetup = {

  setup() {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: AwsConfig.cognito.REGION,
        userPoolId: AwsConfig.cognito.USER_POOL_ID,
        identityPoolId: AwsConfig.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: AwsConfig.cognito.APP_CLIENT_ID
      },
      Storage: {
        region: AwsConfig.s3.REGION,
        bucket: AwsConfig.s3.BUCKET,
        identityPoolId: AwsConfig.cognito.IDENTITY_POOL_ID
      },
      API: {
        endpoints: [
          {
            name: "community-posts",
            endpoint: AwsConfig.apiGateway.URL,
            region: AwsConfig.apiGateway.REGION
          },
        ]
      }
    });
  }

}

export default AwsSetup;