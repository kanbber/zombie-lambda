const { awscdk } = require('projen');

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.170.0',
  defaultReleaseBranch: 'main',
  name: 'zombie-lambda',
  projenrcTs: false,

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
