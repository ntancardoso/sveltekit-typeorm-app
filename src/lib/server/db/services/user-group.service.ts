import groupService from "./group.service";
import { UserGroup } from "../entities/UserGroup";
import { User } from "../entities/User";
import { Group } from "../entities/Group";
import { UserGroupRepository } from "../repositories/user-group.repository";

export class UserGroupService {
    private static instance: UserGroupService;

    // Private constructor to prevent outside instantiation
    private constructor() {}

    // Method to get the singleton instance
    public static getInstance(): UserGroupService {
        if (!UserGroupService.instance) {
            UserGroupService.instance = new UserGroupService();
        }
        return UserGroupService.instance;
    }

    // Method to assign groups to a user
    async assignGroupsToUser(user: User, groupNames: string[]): Promise<void> {
        // const groups = await GroupRepository.findByNames(groupNames);
        for (const groupName of groupNames) {
            let group = await groupService.findOrCreateGroup(groupName);

            let userGroup = await UserGroupRepository.findUserGroupsByUserAndGroup(user.id, group.id);
            if (!userGroup) {
                userGroup = new UserGroup();
                userGroup.user = user;
                userGroup.group = group;
                await UserGroupRepository.save(userGroup);
            }
        }
    }

    // Additional methods can be added here
}

// Exporting the singleton instance
const userGroupService = UserGroupService.getInstance();
export default userGroupService;