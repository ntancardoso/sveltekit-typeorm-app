import { AppDataSource } from '#lib/server/db/DataSource.ts';

let initializing: Promise<unknown> | undefined;

export async function handle({ event, resolve }) {
  if (!AppDataSource.isInitialized) {
    initializing ??= AppDataSource.initialize().then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        initializing = undefined;
        console.error("Error during Data Source initialization", err);
    });
    await initializing;
  }
  const response = await resolve(event);
  return response;
}
