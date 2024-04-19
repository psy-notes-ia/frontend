import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import AuthenticationService from "../../repository/AuthenticationService";

const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    // }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error(
            JSON.stringify({ error: "Nome de usuário ou senha ausente" })
          );
        }
        let response = await AuthenticationService.SignIn(email, password);

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(JSON.stringify({ error: message }));
        }

        const { token, user } = await response.json();

        const jwt = token;

        return {
          ...user,
          jwt,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        return {
          ...token,
          jwt: user.jwt,
          subscribeStatus: user.subscribeStatus,
          plan: user.plan,
          firstAccess: user.firstAccess,
        };
      }
      return token;
    },
    session: async ({ session, token, trigger }) => {
      if (token) {
        session.jwt = token.jwt;
        session.user = token;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 172800,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
