import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "app", "data", "fridge.json");

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    await fs.writeFile(DATA_PATH, JSON.stringify(body, null, 2), "utf8");
    return NextResponse.json(body);
  } catch (e) {
    return NextResponse.json(
      { error: "Could not write file" },
      { status: 500 },
    );
  }
}
