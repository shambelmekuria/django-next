import { DJANGO_API_ENDPOINT } from "@/app/config/defualt";
import APIProxy from "@/app/proxy";
import { NextResponse } from "next/server";

const DJANGO_API_WAITLISTS_URL = `${DJANGO_API_ENDPOINT}/waitlists/`;

export async function GET(request: Request) {
    const {data,status} = await APIProxy.get(DJANGO_API_WAITLISTS_URL, true);
    return NextResponse.json(data, { status: status });
  } 


export async function POST(request:Request) {
    const requestData = await request.json()
    const {data, status} = await APIProxy.post(DJANGO_API_WAITLISTS_URL, requestData, true )
    return NextResponse.json(data, {status: status})
} 
