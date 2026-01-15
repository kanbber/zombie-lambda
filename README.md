# Lambda Zombie

A demonstration of "zombie" code execution in AWS Lambda - where async operations from a failed invocation continue running and appear in logs of subsequent invocations.

## What is a Lambda Zombie?

AWS Lambda reuses execution environments across invocations for performance. When a Lambda handler fails while async operations are still running, those operations can continue executing in the background. When the environment is reused, these "zombie" operations complete and log with the **previous request ID**, creating confusing mixed logs.

## How It Works

This project demonstrates the issue:

1. **First invocation** starts 3 parallel async operations (Promise.all):
   - `kaput` - fails after 500ms → handler throws error
   - `Wo ist er hin?` - completes after 1500ms (still running when handler fails!)
   - `geht durch` - completes after 200ms

2. **Second invocation** (82 seconds later) reuses the same execution environment
   - The zombie `Wo ist er hin?` from the first invocation completes
   - Logs show the OLD request ID mixed with the new one

## Quick Start

```bash
# Deploy the Lambda function
yarn deploy

# Trigger zombie behavior
aws lambda invoke --function-name zombi \
  --cli-binary-format raw-in-base64-out \
  --payload file://examples/errorEx.json res

# Invoke again to see zombie logs (wait a few seconds)
aws lambda invoke --function-name zombi \
  --cli-binary-format raw-in-base64-out \
  --payload file://examples/nextEx.json res
```

## The Zombie in Action

Look at line 10 in the output below - it shows request ID `c6988688` (from invocation #1) completing **during** invocation #2 (request ID `c03b4b5b`):

```
# First invocation - fails after 506ms
START RequestId: c6988688-6c8e-40bc-9414-9421679b55ef
INFO before 'kaput'
INFO before 'Wo ist er hin?'
INFO before 'geht durch'
INFO 'geht durch' done
ERROR Invoke Error
END RequestId: c6988688-6c8e-40bc-9421679b55ef

# Second invocation - 82 seconds later
START RequestId: c03b4b5b-f80b-45ab-b9d1-b67033a2ec34
INFO c6988688-6c8e-40bc-9421679b55ef 'Wo ist er hin?' done  ← ZOMBIE!
INFO c03b4b5b-f80b-45ab-b9d1-b67033a2ec34 before 'Neu 1'
INFO c03b4b5b-f80b-45ab-b9d1-b67033a2ec34 before 'Neu lahm'
INFO c03b4b5b-f80b-45ab-b9d1-b67033a2ec34 'Neu lahm' done
INFO c03b4b5b-f80b-45ab-b9d1-b67033a2ec34 'Neu 1' done
END RequestId: c03b4b5b-f80b-45ab-b9d1-b67033a2ec34
```

## Key Takeaway

Always ensure proper cleanup and error handling in Lambda functions. Background promises can outlive your handler, especially when using `Promise.all()` with operations that have different completion times.

## Tech Stack

- AWS CDK 2.1.0 - Infrastructure as Code
- TypeScript - Strict mode
- AWS Lambda - Node.js 14 runtime
