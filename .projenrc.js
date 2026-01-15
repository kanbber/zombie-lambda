const { awscdk } = require('projen');

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.170.0',
  defaultReleaseBranch: 'main',
  name: 'zombie-lambda',
  projenrcTs: false,

  // CDK configuration
  requireApproval: awscdk.ApprovalLevel.NEVER,

  // CDK context - enable all recommended feature flags for CDK v2
  // Complete list from: https://github.com/aws/aws-cdk/blob/main/packages/aws-cdk-lib/cx-api/FEATURE_FLAGS.md
  context: {
    '@aws-cdk/core:newStyleStackSynthesis': true,
    '@aws-cdk/core:stackRelativeExports': true,
    '@aws-cdk/aws-rds:lowercaseDbIdentifier': true,
    '@aws-cdk/aws-apigateway:usagePlanKeyOrderInsensitiveId': true,
    '@aws-cdk/aws-lambda:recognizeVersionProps': true,
    '@aws-cdk/aws-cloudfront:defaultSecurityPolicyTLSv1.2_2021': true,
    '@aws-cdk/aws-iam:minimizePolicies': true,
    '@aws-cdk/core:checkSecretUsage': true,
    '@aws-cdk/aws-lambda:recognizeLayerVersion': true,
    '@aws-cdk/core:validateSnapshotRemovalPolicy': true,
    '@aws-cdk/aws-codepipeline:crossAccountKeyAliasStackSafeResourceName': true,
    '@aws-cdk/aws-s3:createDefaultLoggingPolicy': true,
    '@aws-cdk/aws-sns-subscriptions:restrictSqsDescryption': true,
    '@aws-cdk/aws-ecs:arnFormatIncludesClusterName': true,
    '@aws-cdk/aws-apigateway:disableCloudWatchRole': true,
    '@aws-cdk/core:enablePartitionLiterals': true,
    '@aws-cdk/aws-ecs:disableExplicitDeploymentControllerForCircuitBreaker': true,
    '@aws-cdk/aws-events:eventsTargetQueueSameAccount': true,
    '@aws-cdk/aws-iam:importedRoleStackSafeDefaultPolicyName': true,
    '@aws-cdk/aws-s3:serverAccessLogsUseBucketPolicy': true,
    '@aws-cdk/customresources:installLatestAwsSdkDefault': true,
    '@aws-cdk/aws-codedeploy:removeAlarmsFromDeploymentGroup': true,
    '@aws-cdk/aws-rds:databaseProxyUniqueResourceName': true,
    '@aws-cdk/aws-apigateway:authorizerChangeDeploymentLogicalId': true,
    '@aws-cdk/aws-ec2:launchTemplateDefaultUserData': true,
    '@aws-cdk/aws-secretsmanager:useAttachedSecretResourcePolicyForSecretTargetAttachments': true,
    '@aws-cdk/aws-redshift:columnId': true,
    '@aws-cdk/aws-stepfunctions-tasks:enableEmrServicePolicyV2': true,
    '@aws-cdk/aws-apigateway:requestValidatorUniqueId': true,
    '@aws-cdk/aws-ec2:restrictDefaultSecurityGroup': true,
    '@aws-cdk/aws-kms:aliasNameRef': true,
    '@aws-cdk/core:includePrefixInUniqueNameGeneration': true,
    '@aws-cdk/aws-autoscaling:generateLaunchTemplateInsteadOfLaunchConfig': true,
    '@aws-cdk/aws-efs:denyAnonymousAccess': true,
    '@aws-cdk/aws-efs:mountTargetOrderInsensitiveLogicalId': true,
    '@aws-cdk/aws-lambda-nodejs:useLatestRuntimeVersion': true,
    '@aws-cdk/aws-appsync:useArnForSourceApiAssociationIdentifier': true,
    '@aws-cdk/aws-rds:auroraClusterChangeScopeOfInstanceParameterGroupWithEachParameters': true,
    '@aws-cdk/aws-rds:preventRenderingDeprecatedCredentials': true,
    '@aws-cdk/aws-codepipeline-actions:useNewDefaultBranchForCodeCommitSource': true,
    '@aws-cdk/aws-cloudwatch-actions:changeLambdaPermissionLogicalIdForLambdaAction': true,
    '@aws-cdk/aws-codepipeline:crossAccountKeysDefaultValueToFalse': true,
    '@aws-cdk/aws-codepipeline:defaultPipelineTypeToV2': true,
    '@aws-cdk/aws-kms:reduceCrossAccountRegionPolicyScope': true,
    '@aws-cdk/aws-ec2:ebsDefaultGp3Volume': true,
    '@aws-cdk/aws-lambda:useCdkManagedLogGroup': true,
    '@aws-cdk/aws-s3:publicAccessBlockedByDefault': true,
    '@aws-cdk/core:aspectStabilization': true,
    '@aws-cdk/aws-iam:oidcRejectUnauthorizedConnections': true,
    '@aws-cdk/pipelines:reduceAssetRoleTrustScope': true,
    '@aws-cdk/pipelines:reduceStageRoleTrustScope': true,
    '@aws-cdk/pipelines:reduceCrossAccountActionRoleTrustScope': true,
    '@aws-cdk/core:target-partitions': ['aws', 'aws-cn'],
  },

  // Project metadata
  description: 'Demonstration of zombie code execution in AWS Lambda',
  authorName: 'Your Name',
  authorEmail: 'your.email@example.com',
  license: 'Apache-2.0',
  repository: 'https://github.com/kanbber/zombie-lambda.git',

  // Node.js and TypeScript configuration
  minNodeVersion: '22.0.0',
  typescriptVersion: '^5.7.0',

  // TypeScript compiler options
  tsconfigDev: {
    compilerOptions: {
      lib: ['es2023'],
    },
  },
  tsconfig: {
    compilerOptions: {
      lib: ['es2023'],
    },
  },

  // Dependencies
  devDeps: [
    '@types/node@22',
    'eslint@^8', // Pin to ESLint v8 for compatibility
    'ts-jest@^29.2.0', // Compatible with TypeScript 5.x
  ],

  // Testing
  jestOptions: {
    jestConfig: {
      coverageThreshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },

  // Code quality
  prettier: true,
  prettierOptions: {
    settings: {
      printWidth: 100,
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
    },
  },

  // GitHub
  githubOptions: {
    pullRequestLintOptions: {
      semanticTitleOptions: {
        types: ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test', 'ci'],
      },
    },
  },

  // Projen configuration
  projenVersion: '^0.99.1',

  // Build
  buildWorkflow: true,
  depsUpgrade: true,
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: {
        cron: ['0 0 * * 1'], // Weekly on Monday
      },
    },
  },
});

project.synth();
