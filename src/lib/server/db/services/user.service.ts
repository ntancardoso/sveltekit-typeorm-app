import { UserRepository } from "../repositories/user.repository";
import { UserGroupService } from "../services/user-group.service";
import { User } from "../entities/User";
import { FindOptionsWhere, ObjectId } from "typeorm";

export class UserService {
    private static instance: UserService;
    private userGroupService: UserGroupService;

    // Private constructor to prevent outside instantiation
    private constructor() {
        this.userGroupService = UserGroupService.getInstance(); // Ensure UserGroupService is also a singleton
    }

    // Method to get the singleton instance
    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }

    async createUser(userData: Partial<User>): Promise<User> {
        let user = new  User();
        const { groups, ...updatedUser } = userData;
        user = Object.assign(user, updatedUser);

        const savedUser = await UserRepository.createUser(user);

        if (groups && groups.length > 0) {
            await this.userGroupService.assignGroupsToUser(savedUser, groups);
        }

        return savedUser;
    }

    async getUserDetails(userId: number): Promise<User | null> {
        return await UserRepository.getUserDetails(userId);
    }

    async softDeleteById(userId: number): Promise<void> {
        await UserRepository.softDeleteById(userId);
    }

    async delete(criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<User>): Promise<void> {        
        await UserRepository.delete(criteria);
    }

    async findAll(options?: any, includeDeleted = false): Promise<User[]> {
        return await UserRepository.findAll(options, includeDeleted);
    }

    async findUserById(userId: number): Promise<User | null>  {
        return await UserRepository.findUserById(userId);
    }
}

const userService = UserService.getInstance();
export default userService;