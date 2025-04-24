import { NextRequest, NextResponse } from "next/server";

export const POST = (request: NextRequest) => {
  console.log("Hello from api");

  return NextResponse.json({ message: "Hello" }, { status: 200 });
};
