import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { serialize, parse } from 'cookie';

const JWT_SECRET=process.env.JWT_SECRET??"meowmweow";
const TOKEN_NAME='auth_token';
const MAX_AGE=60*60*24*7;


export function createJwt(payload:object){
    return jwt.sign(payload,JWT_SECRET,{expiresIn:`${MAX_AGE}s`})
}

export function verifyJwt(token:string){
try {
   return jwt.verify(token,JWT_SECRET)
} catch (error) {
    console.error(error);
    return null;
}
}
export function setTokenCookie(res: Response | NextResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
  if ('headers' in res) {
    // NextResponse or Response
    (res as any).headers.append('Set-Cookie', cookie);
  }
}
export function clearTokenCookie(res: Response | NextResponse) {
  const cookie = serialize(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  if ('headers' in res) (res as any).headers.append('Set-Cookie', cookie);
}
export function getTokenFromRequest(req: Request) {
  const cookie = req.headers.get('cookie') ?? '';
  const parsed = parse(cookie);
  return parsed[TOKEN_NAME];
}