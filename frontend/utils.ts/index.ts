import cookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

export function getAsString(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export const getUser = (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const userId = cookies(ctx)?.userId || "";
  const firstName = cookies(ctx)?.firstName || "";
  const lastName = cookies(ctx)?.lastName || "";
  const smallAvatar = cookies(ctx)?.smallAvatar || "";
  const user = {
    userId: Number(userId),
    firstName: firstName,
    lastName: lastName,
    smallAvatar: smallAvatar
  }
  return user
}