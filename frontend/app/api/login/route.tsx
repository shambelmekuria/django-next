"use server";
import {
  getRefreshToken,
  getToken,
  setRefreshToken,
  setToken,
} from "@/app/lib/auth";
import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = "http://127.0.0.1:8001/api/token/pair";
export async function POST(request: Request) {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  const data = await request.json();
  try {
    const response = await axios.post(API_URL, data);
    const { access, refresh } = response.data;
    setToken(access);
    setRefreshToken(refresh);
    return NextResponse.json({ loggedIn: true }, { status: 200 });
  } 
  catch (error: any) {
    console.log(error);
    return NextResponse.json({ loggedIn: false, ...error }, { status: 400 });
  }
}
