import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { UserGroup } from "./UserGroup";

@Entity({ name: 'group' })
export class Group extends BaseEntity {
    @Column({name: 'group_name', type: 'varchar', length: 100, nullable: false, unique: true})
    groupName: string;

    @OneToMany(() => UserGroup, (userGroup) => userGroup.group, { cascade: true })
    userGroups: UserGroup[];

}