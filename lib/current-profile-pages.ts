import { getAuth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { NextApiRequest } from "next";

// Get the current logged in user, or return null if not logged in
//
// The normal current profile does not work with the page router, which we
// use for the socket API.
export const currentProfilePages = async (req: NextApiRequest) => {
    // Auth with clerk
    const { userId } = getAuth(req);

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