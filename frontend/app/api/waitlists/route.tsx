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
