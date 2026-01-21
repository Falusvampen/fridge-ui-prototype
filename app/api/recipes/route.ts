import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "app", "data", "recipes.json");

export async function GET() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf8");
    return NextResponse.json(JSON.parse(data));
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}
