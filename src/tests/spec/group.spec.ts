import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { AppDataSource } from '../vitest.setup';
import { Group } from '$lib/server/db/entities/Group';
import groupService from '$lib/server/db/services/group.service';

describe('Group Entity Tests', () => {

    let savedGroup: Group

    beforeAll(async () => {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
    });

    afterAll(async () => {
        if (savedGroup) {
            await groupService.delete(savedGroup.id);
        }
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });

    it('should create a new group', async () => {
        savedGroup = await groupService.createGroup('Testers');
        expect(savedGroup.id).toBeDefined();
        expect(savedGroup.groupName).toBe('Testers');
    });

    it('should retrieve all groups', async () => {
        const groups = await groupService.listAllGroups();
        expect(groups.length).toBeGreaterThan(0);
    });

    it('should be marked as deleted', async () => {
        await groupService.softDeleteById(savedGroup.id);
        const group = await groupService.findGroupById(savedGroup.id);
        expect(group).toBeNull;
    });
});
