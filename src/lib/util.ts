export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// proxy to default logger
export const logger = console;
