import { DJANGO_API_ENDPOINT, DJANGO_BASE_URL } from "@/app/config/defualt";
import APIProxy from "@/app/proxy";
import { NextResponse } from "next/server";

const DJANGO_API_WAITLISTS_URL = `${DJANGO_API_ENDPOINT}/waitlists/`;

export async function GET(request: Request, { params }: { params:Promise< { id:string }> }) {
  let  {id} = await params
  let endid = Number(id)

  const endPoints = `${DJANGO_API_WAITLISTS_URL}${endid}`;
  if(!id){
   return NextResponse.json({},{status:400}) 
  }
  const {data,status} = await APIProxy.get(endPoints,true)
  console.log(data,status)
  return NextResponse.json(
     data,
    { status: 200 }
  );
}
