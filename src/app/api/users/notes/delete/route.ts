import { connectDb } from "@/dbConfig/dbConfig";
import { verifyToken } from "@/middleware/auth";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  await connectDb();
  const { userId, error } = verifyToken(req.headers);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { noteId } = await req.json();

  const deleted = await Note.findOneAndDelete({ _id: noteId, userId });
  if (!deleted) return NextResponse.json({ error: "Note not found" }, { status: 404 });

  return NextResponse.json({ message: "Note deleted" });
}