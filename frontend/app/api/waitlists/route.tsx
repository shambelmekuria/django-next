import { getToken } from "@/app/lib/auth";
import axios from "axios";
import { NextResponse } from "next/server";

const DJANGO_API_ENDPOINT = "http://127.0.0.1:8001/api/waitlist/";
export async function GET(request: Request) {
  const token = await getToken();
  if (!token) return NextResponse.json({}, { status: 401 });
  const response = await axios.get(DJANGO_API_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response) return NextResponse.json({ ...response.data }, { status: 200 });
  if (!response) return NextResponse.json({}, { status: 400 });
}

export async function POST(request: Request) {
  const token = await getToken();
  const data = await request.json();
  console.log(data)
  try {
    const response = await axios.post(DJANGO_API_ENDPOINT, data,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });
    
    return NextResponse.json({ }, { status: 200 });
  } 
  catch (error: any) {
    console.log("Backend Error",error);
    return NextResponse.json({ message:"Invalid Request Found" }, { status: 400 });
  }
}
