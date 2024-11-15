import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../DataSource';
import { UserGroup } from '../entities/UserGroup';
import { User } from '../entities/User';
import { Group } from '../entities/Group';


export const UserGroupRepository = AppDataSource.getRepository(UserGroup).extend({

    async createUserGroup(user: User, group: Group) {
        const userGroup = this.create({ user, group });
        return await this.save(userGroup);
    },

    async findUserGroupsByUserId(userId: number) {
        return await this.find({ where: { user: { id: userId } }, relations: ['group'] });
    },

    async findUserGroupsByGroupId(groupId: number) {
        return await this.find({ where: { group: { id: groupId } }, relations: ['user'] });
    },

    async findUserGroupsByUserAndGroup(userId: number, groupId: number) {
        return await this.findOne({
            where: {
                user: { id: userId },
                group: { id: groupId }
            },
            relations: ['user', 'group']
        });
    },

    async findAll(customParams?: FindOptionsWhere<UserGroup>): Promise<UserGroup[]> {
        if (!customParams) {
            return await this.find();
        }
        
        return await this.find({
            where: customParams,
        });
    }
})