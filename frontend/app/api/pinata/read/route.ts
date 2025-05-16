import { NextResponse, type NextRequest } from "next/server";
import { getPinataConfig } from "@/app/config";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cid = searchParams.get("cid");
    
    if (!cid) {
      return NextResponse.json({ error: "CID is required" }, { status: 400 });
    }
    
    const pinata = await getPinataConfig()
    const url = pinata.gateways.get(cid)

    return NextResponse.json(url , { status: 200 });
  } catch (error) {
    console.error('Error reading from IPFS:', error);
    return NextResponse.json({ error: 'Failed to read from IPFS' }, { status: 500 });
  }
}