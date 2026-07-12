import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!phone) {
      return NextResponse.json(
        { error: "WhatsApp number is not configured." },
        { status: 500 }
      );
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}