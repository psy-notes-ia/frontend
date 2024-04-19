import * as jose from "jose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "./i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  // matcher: ["/api", "/", "/signin","/:lang/*"],
  matcher: ["/((?!api|_next/static|_next/image|favicon|assets|sw.js).*)"],
};

export async function middleware(req: any) {
  const path: string = req.nextUrl.pathname;
  let lng;

  if (!lng) lng = SetUpLanguage(req);
  SetUpResponse(req, lng);

  if (!path.startsWith(`/${lng}`)) {
    const newURL = new URL(`${lng}${path}`, req.url);

    if (newURL.toString() !== req.url) {
      return NextResponse.redirect(newURL);
    }
  }

  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session && path.startsWith(`/${lng}`) && path !=`/${lng}/signin` && path !=`/${lng}/reset-password` && path !=`/${lng}/new-password`) {
      throw new Error("No Authentication");
    }
    
    if (session) {
      const payload = await jose.jwtVerify(
        session?.jwt!,
        new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
      );
    }

    if (session && path.endsWith(`/signin`)) {
      return NextResponse.redirect(new URL(`/${lng}/`, req.url));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/${lng}/signin`, req.url));
  }

  return NextResponse.next();
}

function SetUpResponse(req: NextRequest, lang: any) {
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  )
    return NextResponse.next();
  let lng: string | undefined | null = lang;
  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") || "");
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  // return lng;
}

function SetUpLanguage(req: NextRequest): string {
  let lng: string | undefined | null;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  return lng??"";
}
