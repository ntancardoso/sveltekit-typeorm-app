import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../DataSource';
import { User } from '../entities/User';

export const UserRepository = AppDataSource.getRepository(User).extend({

    async createUser(data: User) {
        const user = this.create(data);
        return await this.save(user);
    },

    async getUserDetails(userId: number) {
        return await this.findOne({ where: { id: userId }, relations: ['userGroups'] });
    },

    async findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    },

    async findAll(options?: any, includeDeleted = false): Promise<User[]> {
        const findOptions: FindOptionsWhere<User> | FindOptionsWhere<User>[] = options ? options as FindOptionsWhere<User> : {};
        return await this.find({ where: findOptions, whereDeleted: includeDeleted });
    },

    async findUserById(id: number): Promise<User | null> {
        return await this.findOne({ where: { id: id } });
    },

    async softDeleteById(id: number): Promise<void> {
        const user = await this.findUserById(id);
        if (!user) {
            throw new Error('User not found');
        }

        // soft delete user group


        // modified username/email to fix uniquness
        user.username += '-del' + Date.now();
        user.email += '-del' + Date.now();
        user.deletedOn = new Date();
        await this.save(user);
    },

});
