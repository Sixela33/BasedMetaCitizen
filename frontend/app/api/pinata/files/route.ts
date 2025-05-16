import { NextResponse, type NextRequest } from "next/server";
import { getPinataConfig } from "@/app/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    
    if(!file) return NextResponse.json("Invalid file", {status: 401})
    
    const pinata = await getPinataConfig()
    const uploadData = await pinata.upload.file(file)
    
    /**
      const url = await pinata.gateways.createSignedURL({
        cid: uploadData.cid,
        expires: 3600,
      });
    */
   
    return NextResponse.json(uploadData.IpfsHash, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
