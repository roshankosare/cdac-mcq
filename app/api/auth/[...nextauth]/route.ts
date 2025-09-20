
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  pages: { signIn: "/auth/sign-in" },

  callbacks: {
    async jwt({ token }: { token: JWT; user?: User }): Promise<JWT> {
      return token;
    },
    async session({
      session,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const username = credentials?.username;
          const password = credentials?.password;

          if (!username || !password) {
            throw new Error("Bad request");
          }

          const adminUserName = process.env.ADMIN_USERNAME;
          const adminPassword = process.env.ADMIN_PASSWORD;

          if (!adminPassword || !adminUserName) {
            throw new Error("Internal server error");
          }

          if (adminUserName !== username) {
            throw new Error("Invalid email or password");
          }

          if (adminPassword !== password) {
            throw new Error("Invalid email or password");
          }

          return { id: "admin" };
        } catch (error) {
          if (error instanceof Error) throw new Error(error.message);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
