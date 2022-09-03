import { NextResponse } from "next/server";

export default function middleware(req) {
  let verify = req.cookies.get("token");
  let url = req.url;

  if (
    (verify && url === "https://tv7app.herokuapp.com/login") ||
    (verify && url === "https://tv7app.herokuapp.com/register")
  ) {
    return NextResponse.redirect("https://tv7app.herokuapp.com");
  }
}
