import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

// Get the current logged in user, or return null if not logged in
export const currentProfile = async () => {
    // Auth with clerk
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    // Find corresponding clerk user in database
    const profile = await db.profile.findUnique({
        where: {
            userId // equivalent to userId: userId
        }
    });

    return profile;
}