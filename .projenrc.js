const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.170.0',
  defaultReleaseBranch: 'main',
  name: 'zombi_lambda',
  minNodeVersion: '22.0.0',
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
  devDeps: [
    '@types/node@22',
  ],

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
