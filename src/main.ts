import { App, Stack, StackProps, aws_lambda_nodejs as lambda, Duration } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    new lambda.NodejsFunction(this, 'zombi', {
      functionName: 'zombi',
      runtime: Runtime.NODEJS_22_X,
      timeout: Duration.seconds(30),
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'zombi-lambda-dev', { env: devEnv });
// new MyStack(app, 'zombi_lambda-prod', { env: prodEnv });

app.synth();
