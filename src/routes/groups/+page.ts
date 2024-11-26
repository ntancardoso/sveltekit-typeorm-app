import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
    const response = await fetch('/api/groups');
    const groups = await response.json();

    return {
        groups: groups
    };
};