"use server";
import { getToken, setRefreshToken, setToken } from "@/app/lib/auth";
import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:8001/api/token/pair";
export async function POST(request: Request) {
  const data = await request.json();
  const response = await axios.post(API_URL, data);
  if (response) {
    const { access, refresh } = response.data;
    setToken(access);
    setRefreshToken(refresh)
    
  }

  return NextResponse.json(
    {
      message: "Shambel is Best Developer",
      token: await getToken(),
    },
    {
      status: 200,
    }
  );
}
