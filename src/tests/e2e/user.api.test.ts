import { test, expect } from '@playwright/test';

test.describe('User API E2E Tests', () => {

    const TEST_USERNAME: string = 'janedoe';
    let userId: number;

    test.beforeAll(async ({ request }) => {
        const response = await request.get(`http://localhost:4173/api/users?username=${TEST_USERNAME}-del&includeDeleted=true`);
        const users = await response.json();
        if (users.length > 0) {
            expect(users[0].username).toBe(`${TEST_USERNAME}-del`);
            await request.delete(`http://localhost:4173/api/users/${users[0].id}`);
        }
    });

    test('should create a user', async ({ request }) => {
        const response = await request.post('http://localhost:4173/api/users', {
            data: {
                username: TEST_USERNAME,
                email: 'jane@example.com',
                groups: ['User', 'Developer']
            },
        });
        expect(response.ok()).toBeTruthy();
        const user = await response.json();
        userId = user.id;
        expect(user.username).toBe(TEST_USERNAME);
        expect(user.email).toBe('jane@example.com');
    });

    test('should retrive a user by id', async ({request}) => {
        const response = await request.get(`http://localhost:4173/api/users/${userId}`);
        const user = await response.json();
        expect(user.username).toBe(TEST_USERNAME);
    });

    test('should update a user by id', async ({request}) => {
        const response = await request.put(`http://localhost:4173/api/users/${userId}`, {
            data: {
                email: 'janedoe@example.com',
                firstName: 'Jane',
                lastName: 'Doe'
            },
        });
        const user = await response.json();
        expect(user.username).toBe(TEST_USERNAME);
        expect(user.email).toBe('janedoe@example.com');
        expect(user.lastName).toBe('Doe');
    });
    test('should retrive all users and find the user we created', async ({request}) => {
        const response = await request.get('http://localhost:4173/api/users');
        const users = await response.json();
        expect(users.some((u: any) => u.id === userId)).toBeTruthy();
    });

    test('should delete user by id', async ({request}) => {
        let response = await request.delete(`http://localhost:4173/api/users/${userId}`);
        expect(response.status()).toBe(200);

        response = await request.get('http://localhost:4173/api/users');
        const users = await response.json();
        expect(users.some((u: any) => u.id === userId)).toBeFalsy();
    });
});
