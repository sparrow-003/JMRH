
interface ProcessEnv {
  readonly API_KEY: string;
}

// Fix: Removed 'readonly' modifier from 'env' to match existing declarations of the Process interface, resolving modifier mismatch.
interface Process {
  env: ProcessEnv;
}

// Fix: Removed 'declare var process' to prevent redeclaration of the block-scoped 'process' variable which is already defined globally.

declare module 'twind/colors';
declare module 'twind/shim';
