import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";
import { notFound } from "next/navigation";

export const getSelf = async () => {
    const self = await currentUser();

    if(!self || !self.username){
        throw new Error("Unauthorized")
    }

    const user = db.user.findUnique({
        where:{
            externalUserId: self.id
        }
    })

    if(!user){
        throw new Error("Not Found")
    }

    return user;

}

export const getSelfByUsername = async (username: string) => {
    const self = await currentUser();

    if(!self || !self.username){
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where:{
            username,
        }
    })
    if(!user){
        notFound()
    }

    if(self.username !== user.username){
        notFound()
    }

    return user;
}
