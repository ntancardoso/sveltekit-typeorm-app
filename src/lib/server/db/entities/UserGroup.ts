import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";
import { Group } from "./Group";

@Entity({ name: 'user_group' })
export class UserGroup extends BaseEntity {
    @ManyToOne(() => User, (user) => user.userGroups, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    // @ManyToOne(() => User, (user) => user.userGroups, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Group, (group) => group.userGroups, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'group_id' })
    group: Group;

    // Add additional fields if necessary
}