import "@fastify/cookie";
import { FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyReply {
    setCookie(
      name: string,
      value: string,
      options?: import("@fastify/cookie").FastifyCookieOptions
    ): FastifyReply;
  }
}
