import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io"
import { Server, Member, Profile } from "@prisma/client"

export const imageFileTypes = ["tiff", "jfif", "bmp", "gif", "svg", "svgz", "png", "jpeg", "jpg", "webp", "ico", "xbm", "dib", "pjp", "apng", "tif", "pjpeg", "avif"];
export const pdfFileTypes = ["pdf"];
export const audioFileTypes = ["opus", "flac", "webm", "weba", "wav", "ogg", "m4a", "oga", "mid", "mp3", "aiff", "wma", "au"];

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer
        };
    };
};