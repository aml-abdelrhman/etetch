import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@/types"
import api from "@/lib/api"
import { CredentialsSignin } from "next-auth";
  
export class InvalidCredentialsError extends CredentialsSignin {
    code = "invalid_credentials";
    message = "Invalid credentials";
    status = 401;
    cause?: (Record<string, unknown> & { err?: Error; }) | undefined;
    name: string = "InvalidCredentialsError";
}
export class blockedAccount extends CredentialsSignin {
    code = "blocked_account";
    message = "Account is blocked";
    status = 401;
    cause?: (Record<string, unknown> & { err?: Error; }) | undefined;
    name: string = "blockedAccountError";
}

const SignIn = async (email: string, password: string) => {
    try {
        const data = await api.request.post("user/login", {
            email,
            password,
        });
        if (data?.result?.data) {
            return data?.result?.data;
        } else if (data?.message) {
            return { error: "Wrong Email Or password " + data?.message, status: 422, ok: false };
        } else {
            return { error: "Wrong Email Or password " + data?.message, status: 422, ok: false };
        }
    } catch (error: any) {
        if (error?.response?.data?.message === "حسابك غير مفعل") {
            throw new blockedAccount(error?.response?.data?.message ?? "Wrong Email Or password");
        } else {
            throw new InvalidCredentialsError(error?.response?.data?.message ?? "Wrong Email Or password");
        }

    }
};

// Add a new function to verify token and get user data
const verifyToken = async (token: string) => {
    try {
        const data = await api.request.get("user/profile/edit", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (data?.result?.data) {
            return { ...data?.result.data, token };
        }
        return null;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
};


declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                token: { label: "Token", type: "text" }
            },
            async authorize(credentials) {
                // Handle token-based auth
                if (credentials?.token) {
                    const userData = await verifyToken(credentials.token as string);
                    if (userData) {
                        return userData;
                    }
                    throw new Error("رمز الوصول غير صالح");
                }

                // Regular email/password auth
                const email = credentials?.email;
                const password = credentials?.password;

                if (email && password) {
                    const data = await SignIn(email as string, password as string);
                    const user: User = data;
                    if (data?.token) {
                        return user;
                    } else if (data?.error) {
                        throw new Error(data.error);
                    } else if (data?.message) {
                        throw new Error(data.message);
                    } else {
                        throw new Error("خطأ في تسجيل الدخول");
                    }
                }
                throw new Error("بيانات الاعتماد غير صالحة");
            },
        }),
    ],

    callbacks: {
        jwt({ token, user, trigger, session }) {
            if (trigger === "update") {
                return { ...token, ...session };
            }

            if (user) {
                return { ...token, ...user };
            }

            return token;
        },
        session({ session, token }) {
            if (token && session.user) {
                // @ts-ignore
                session.user = { ...token } as User;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
        newUser: "/auth",
        error: "/auth/login"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
})