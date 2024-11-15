import { User } from "$lib/server/db/entities/User";
import userService from "$lib/server/db/services/user.service.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const userData = await request.json();
        
        let user = new User();
        Object.assign(user, userData);

        user = await userService.createUser(user);

        return json(user, { status: 201 });
    } catch (error) {
        let errorMessage = "User creation failed";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error("Error creating user:", error);

        return json({ message: errorMessage }, { status: 400 });
    }
}

export async function GET({ url }) {
    
    const includeDeletedParam = url.searchParams.get('includeDeleted');
    const includeDeleted = (includeDeletedParam?.toLowerCase() === 'true') || false;

    if (url.searchParams.has('includeDeleted')) {
        url.searchParams.delete('includeDeleted');
    }
    let params: any = Object.fromEntries(url.searchParams.entries());

    const users = await userService.findAll(params, includeDeleted);
    return json(users);
}
