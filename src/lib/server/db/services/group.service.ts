import { GroupRepository } from "../repositories/group.repository";
import { Group } from "../entities/Group";
import { FindOptionsWhere, ObjectId } from "typeorm";

export class GroupService {
    private static instance: GroupService;

    private constructor() {}

    public static getInstance(): GroupService {
        if (!GroupService.instance) {
            GroupService.instance = new GroupService();
        }
        return GroupService.instance;
    }

    async createGroup(groupName: string): Promise<Group> {
        const group = await GroupRepository.createGroup(groupName);
        return group;
    }

    async findGroupById(groupId: number): Promise<Group | null> {
        return await GroupRepository.findGroupById(groupId);
    }

    async listAllGroups(): Promise<Group[]> {
        return await GroupRepository.find();
    }

    async findByGroupName(groupName: string): Promise<Group | null> {
        return await GroupRepository.findOne({where: {groupName: groupName}});
    }

    async findOrCreateGroup(groupName: string): Promise<Group> {
        let group = await this.findByGroupName(groupName);
        if (!group) {
            group = await this.createGroup(groupName);
        }
        return group;
    }

    async findAll(options?: any, includeDeleted = false): Promise<Group[]> {
        return await GroupRepository.findAll(options, includeDeleted);
    }

    async softDeleteById(groupId: number): Promise<void> {
        await GroupRepository.softDeleteById(groupId);
    }

    async delete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<Group>): Promise<void> {        
        await GroupRepository.delete(criteria);
    }
}

// Exporting the singleton instance
const groupService = GroupService.getInstance();
export default groupService;