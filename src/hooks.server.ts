import { AppDataSource } from '$lib/server/db/DataSource';

export async function handle({ event, resolve }) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize().then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
        return new Response("Database connection error", { status: 500 });
    });
  }
  const response = await resolve(event);
  return response;
}
