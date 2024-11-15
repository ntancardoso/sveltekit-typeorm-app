import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../DataSource';
import { Group } from '../entities/Group';

export const GroupRepository = AppDataSource.getRepository(Group).extend({

    async createGroup(groupName: string ) {
        const group = this.create({groupName: groupName});
        return await this.save(group);
    },

    async deleteById(id: number): Promise<void> {
        await this.delete(id);
    },

    async softDeleteById(id: number): Promise<void> {
        const group = await this.findGroupById(id);
        if (!group) {
            throw new Error('Group not found');
        }

        // set user group group to null


        group.groupName += '-del' + Date.now();
        group.deletedOn = new Date();
        await this.save(group);
    },

    async findAll(options?: any, includeDeleted = false): Promise<Group[]> {
        const findOptions: FindOptionsWhere<Group> | FindOptionsWhere<Group>[] = options ? options as FindOptionsWhere<Group> : {};
        return await this.find({ where: findOptions, whereDeleted: includeDeleted });
    },

    async findGroupById(id: number): Promise<Group | null> {
        return await this.findOne({ where: { id: id} });
    },

});