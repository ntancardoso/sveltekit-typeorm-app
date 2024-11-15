import { UserRepository } from "$lib/server/db/repositories/user.repository";
import { json } from "@sveltejs/kit";


export async function GET({ params }) {
    const user = await UserRepository.getUserDetails(parseInt(params.id))
    if (!user) {
        return json({ message: "user not found" }, { status: 404 });
    }
    return json(user);
}

export async function PUT({ params, request }) {
    try {
        const userId = parseInt(params.id);
        let user = await UserRepository.findOneBy({ id: userId });

        if (!user) {
            return json({ message: "User not found" }, { status: 404 });
        }

        const updates = await request.json();
        Object.assign(user, updates);

        const updated_user = await UserRepository.save(user);
        return json(updated_user);
    } catch (error) {
        console.error("Error updating user:", error);
        return json({ message: "An error occurred while updating the user." }, { status: 500 });
    }
}

export async function DELETE({ params }) {
    // const result = await UserRepository.deleteById(parseInt(params.id));
    const result = await UserRepository.softDeleteById(parseInt(params.id));
    // return json(null, { status: 204 });
    return json({ message: "User deleted" }, { status: 200 });
}
