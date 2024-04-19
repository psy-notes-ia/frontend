
import { getSession, signOut } from "next-auth/react";

const AppFetch = async (url: string, options: RequestInit = {}) => {

  const session = await getSession();

  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    "include": "credentials",
    ...(session && { Authorization: `Bearer ${session.jwt}` })
  };


  const backend = process.env.NEXT_PUBLIC_BACKEND_URL as string;

  const response = await fetch(backend + url, options);

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }

  return response;
};

const AppFetchJSON = async (url: string, options: RequestInit = {}) => {
  const response = await AppFetch(url, options);

  return await response.json();
};

const BasicFetch = (arg: any, ...args: any) =>
fetch(arg, ...args).then((res) => res.json());


export {BasicFetch, AppFetch, AppFetchJSON };