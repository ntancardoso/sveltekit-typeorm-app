import "reflect-metadata"
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Group } from "./entities/Group";
import { UserGroup } from "./entities/UserGroup";
import ormconfig from './ormconfig';


export const entities = [ 
    User, 
    Group, 
    UserGroup
];

const dataSourceConfig = { 
    ...ormconfig,
    entities: entities
}

console.log(dataSourceConfig)

export const AppDataSource = new DataSource(dataSourceConfig);

// Initialize the DataSource
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });