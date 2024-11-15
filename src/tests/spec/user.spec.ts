import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { AppDataSource } from '../vitest.setup';
import { User } from '$lib/server/db/entities/User';
import userService from '$lib/server/db/services/user.service';

describe('User Entity Tests', () => {

    let savedUser: User;

    beforeAll(async () => {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
    });

    afterAll(async () => {
        if (savedUser) {
            await userService.delete(savedUser.id);
        }
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });

    it('should create a new user', async () => {
        const user = new User();
        user.username = 'jdoe';
        user.firstName = 'John';
        user.lastName = 'Doe';
        user.email = 'john@example.com';

        savedUser = await userService.createUser(user);
        expect(savedUser.id).toBeDefined();
        expect(savedUser.username).toBe('jdoe');
        expect(savedUser.firstName).toBe('John');
        expect(savedUser.lastName).toBe('Doe');
        expect(savedUser.email).toBe('john@example.com');
    });

    it('should retrieve all users', async () => {
        const users = await userService.findAll();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should be marked as deleted', async () => {
        await userService.softDeleteById(savedUser.id);
        const user = await userService.findUserById(savedUser.id);
        expect(user).toBeNull;
    });

});
