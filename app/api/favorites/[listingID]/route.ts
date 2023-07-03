import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import primsa from "@/app/libs/prismadb";

interface IParams {
    listingID: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
){
    const currentUser = await getCurrentUser();
    
    if(!currentUser){
        return NextResponse.error();
    }

    const { listingID } = params;

    if (!listingID || typeof listingID !== "string") {
        throw new Error("Invalid listing ID");
    }

    let favoritesIds = [...(currentUser.favoritesIds || [])];

    favoritesIds.push(listingID);

    const user = await primsa.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoritesIds
        }
    });

    return NextResponse.json(user);
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { listingID } = params;

    if (!listingID || typeof listingID !== "string") {
        throw new Error("Invalid listing ID");
    }

    let favoritesIds = [...(currentUser.favoritesIds || [])];

    favoritesIds = favoritesIds.filter(id => id !== listingID);

    const user = await primsa.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            favoritesIds
        }
    });

    return NextResponse.json(user);
}