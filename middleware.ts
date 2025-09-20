export { default } from "next-auth/middleware";
// middleware.ts

export const config = {
  matcher: ["/add-question"],
};
