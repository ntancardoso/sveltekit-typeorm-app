import { AppDataSource } from '$lib/server/db/DataSource';

export const setup = async () => {
    console.log("Setup Called");

    await AppDataSource.initialize();
    await AppDataSource.synchronize(true);

    console.log("Done Setup");
};

export const teardown = async () => {
    console.log("Destroy called!");
    await AppDataSource.destroy();
};

export { AppDataSource };