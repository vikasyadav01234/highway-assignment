import { connectDb } from "@/dbConfig/dbConfig";
import { verifyToken } from "@/middleware/auth";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDb();
  const { userId, error } = verifyToken(req.headers);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const notes = await Note.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json({ notes });
}