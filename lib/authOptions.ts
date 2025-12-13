import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.firstName,
                };
            }
        })
    ],
    callbacks: {
        async signIn({ account, profile }) {
            try {
                if (account?.provider === "google" && profile?.email) {
                    const existingUser = await prisma.user.findUnique({
                        where: { email: profile.email },
                    });

                    if (!existingUser) {
                        const nameParts = profile.name?.split(" ") || [];
                        const firstName = nameParts[0] || "";
                        const lastName = nameParts.slice(1).join(" ") || "";

                        await prisma.user.create({
                            data: {
                                email: profile.email,
                                firstName: (profile as any).given_name || firstName,
                                lastName: (profile as any).family_name || lastName,
                                password: "", // Empty password for OAuth users
                            },
                        });
                    }
                }
                return true;
            } catch (error) {
                console.error("Error checking/creating user", error);
                return false;
            }
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async session({ session, token }) {
            if (session?.user) {
                // @ts-ignore
                session.user.id = token.sub;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
};
