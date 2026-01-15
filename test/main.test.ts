import { App } from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import { MyStack } from '../src/main';

describe('Lambda Zombie Stack', () => {
  let template: Template;

  beforeAll(() => {
    const app = new App();
    const stack = new MyStack(app, 'test');
    template = Template.fromStack(stack);
  });

  test('Snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });

  test('Creates Lambda function with correct name', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      FunctionName: 'zombi',
    });
  });

  test('Lambda function uses Node.js runtime', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Runtime: Match.stringLikeRegexp('nodejs.*'),
    });
  });

  test('Lambda function has proper handler configuration', () => {
    template.hasResourceProperties('AWS::Lambda::Function', {
      Handler: 'index.handler',
    });
  });

  test('Creates exactly one Lambda function', () => {
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });

  test('Lambda function has IAM role', () => {
    template.hasResourceProperties('AWS::IAM::Role', {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
      },
    });
  });

  test('Lambda function has basic execution policy', () => {
    template.hasResourceProperties('AWS::IAM::Role', {
      ManagedPolicyArns: Match.arrayWith([
        Match.objectLike({
          'Fn::Join': Match.arrayWith([
            Match.arrayWith([Match.stringLikeRegexp('.*AWSLambdaBasicExecutionRole')]),
          ]),
        }),
      ]),
    });
  });
});
