import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  return json("dh=40be569a3571fe2ec8d2988d51a0b72b12ab52b4");
}