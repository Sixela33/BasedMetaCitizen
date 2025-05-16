import { NextResponse, type NextRequest } from "next/server";
import { getPinataConfig } from "@/app/config";

export async function POST(request: NextRequest) {
  try {
    const stringData = await request.text()
    const jsonData = JSON.parse(stringData)
    
    const pinata = await getPinataConfig()
    const uploadData = await pinata.upload.json(jsonData)

    return NextResponse.json(uploadData.IpfsHash, { status: 200 });
  } catch (error) {
    console.error('Error uploading JSON:', error);
    return NextResponse.json({ error: 'Failed to upload JSON' }, { status: 500 });
  }
}
