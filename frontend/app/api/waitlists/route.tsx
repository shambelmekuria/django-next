import APIProxy from "@/app/proxy";
import { NextResponse } from "next/server";

const DJANGO_API_ENDPOINT = "http://127.0.0.1:8001/api/waitlist/";

export async function GET(request: Request) {
    const {data,status} = await APIProxy.get(DJANGO_API_ENDPOINT, true);
    return NextResponse.json(data, { status: status });
  } 
export async function POST(request: Request) {
  const requestData = await request.json();
    const {data,status} = await APIProxy.post(DJANGO_API_ENDPOINT, requestData, true);
    return NextResponse.json(data, {status});
}
