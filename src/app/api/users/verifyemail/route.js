import connect from "@/db/dbconfig";
import {User} from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req) {
    try {
        const reqBody  = await req.json()
        const {token} = reqBody;

        console.log(token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({error: "User Not found"}, {status: 404})
        }

        user.isVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({error: "Email Verified", success: true})

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}