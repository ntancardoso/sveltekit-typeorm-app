import { Group } from "#lib/server/db/entities/Group.ts";
import { GroupRepository } from "#lib/server/db/repositories/group.repository.ts";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const { name } = await request.json();
    const group = new Group();
    group.groupName = name;

    await GroupRepository.createGroup(group);
    return json(group, { status: 201 });
}

export async function GET({ params }) {
    if (params.id) {
        // Fetch a single group by ID
        const group = await GroupRepository.findOneBy({ id: parseInt(params.id) });

        if (!group) {
            return json({ message: "Group not found" }, { status: 404 });
        }
        return json(group);
    } else {
        // Fetch all groups
        const groups = await GroupRepository.find();
        return json(groups);
    }
}

export async function PUT({ params, request }) {
    const group = await GroupRepository.findOneBy({ id: parseInt(params.id) });

    if (!group) {
        return json({ message: "Group not found" }, { status: 404 });
    }

    const { groupName } = await request.json();
    group.groupName = groupName || group.groupName;
    await GroupRepository.save(group);
    return json(group);
}

export async function DELETE({ params }) {
    await GroupRepository.markDeleteById(parseInt(params.id));

    //if (result.affected === 0) {
    //    return json({ message: "Group not found" }, { status: 404 });
    // }
    return json(null, { status: 204 });
}
