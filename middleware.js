import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("token");
  let url = req.url;

  if (
    (verify && url === "http://127.0.0.1:3000/login") ||
    (verify && url === "http://127.0.0.1:3000/register")
  ) {
    return NextResponse.redirect("http://127.0.0.1:3000/");
  }
}
