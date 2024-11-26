import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const response = await fetch('/api/users');
    const users = await response.json();

    return {
        users: users
    };
};