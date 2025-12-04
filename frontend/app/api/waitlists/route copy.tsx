import { getToken } from "@/app/lib/auth";
import APIProxy from "@/app/proxy";
import axios from "axios";
import { NextResponse } from "next/server";

const DJANGO_API_ENDPOINT = "http://127.0.0.1:8001/api/waitlist/";
export async function GET(request: Request) {
  const token = await getToken();
  if (!token) return NextResponse.json({}, { status: 401 });

  const response = await axios.get(DJANGO_API_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = response.data
  if (response) return NextResponse.json({data }, { status: 200 });
  if (!response) return NextResponse.json({}, { status: 400 });
}

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const response = await APIProxy.post(DJANGO_API_ENDPOINT, data, true);

    return NextResponse.json({}, { status: 200 });
  } 
  catch (error: any) {
    console.log("Backend Error", error);
    return NextResponse.json(
      { message: "Invalid Request Found" },
      { status: 400 }
    );
  }
}
