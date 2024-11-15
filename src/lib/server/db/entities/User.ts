import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { UserGroup } from "./UserGroup";

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Column({type: 'varchar', length: 50, nullable: false,  unique: true})
    username: string;

    @Column({type: 'varchar', length: 100, nullable: true,  unique: true})
    email: string;

    @Column({name: 'first_name', type: 'varchar', length: 150, nullable: true})
    firstName: string;

    @Column({name: 'last_name', type: 'varchar', length: 150, nullable: true})
    lastName: string;
    
    @OneToMany(() => UserGroup, (userGroup) => userGroup.user, { cascade: true })
    userGroups: UserGroup[];

    groups: string[];
}