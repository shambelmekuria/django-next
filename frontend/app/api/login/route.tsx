"use server";
import { DJANGO_API_ENDPOINT } from "@/app/config/defualt";
import {
  getRefreshToken,
  getToken,
  setRefreshToken,
  setToken,
} from "@/app/lib/auth";
import axios from "axios";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = `${DJANGO_API_ENDPOINT}/token/pair`;
export async function POST(request: Request) {
  const token = await getToken();
  const refreshToken = await getRefreshToken();
  const data = await request.json();
  try {
    const response = await axios.post(DJANGO_API_LOGIN_URL, data);
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
