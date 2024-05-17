import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return auth().redirectToSignIn();
    }

    if (!params.inviteCode) {
        return redirect("/");
    }

    const validCode = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode
        }
    });

    if (!validCode) {
        return redirect("/");
    }

    const userAlreadyInServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (userAlreadyInServer) {
        return redirect(`/servers/${userAlreadyInServer.id}`);
    }
    
    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return null;
}
 
export default InviteCodePage;