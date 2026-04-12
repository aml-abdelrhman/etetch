import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@/types"
import { CredentialsSignin } from "next-auth";
import api from "@/lib/api";

// دالة جلب البيانات من الـ API
export const userService = {
  getAllUsers: async (): Promise<any[]> => {
    // جلب البيانات من المسار المذكور في .env
    const response = await api.request.get<any[]>("users");
    return Array.isArray(response) ? response : (response as any)?.data || [];
  }
};

export class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
  message = "بيانات الدخول غير صحيحة";
}

const SignIn = async (email: string, password: string) => {
  try {
    console.log("🔐 محاولة تسجيل دخول لـ:", email);

    // 1. جلب كل اليوزرز من MockAPI
    const users = await userService.getAllUsers();

    // 2. البحث عن اليوزر المطابق يدوياً (لأننا في مشروع تجريبي)
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log("✅ تم العثور على المستخدم:", user.name);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token || "mock-token",
        enrolledCourses: user.enrolledCourses || [],
        myCourses: user.myCourses || [],
      };
    }

    console.log("❌ مستخدم غير موجود");
    return null;
  } catch (error: any) {
    console.error("❌ SignIn Error:", error.message);
    return null;
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await SignIn(credentials.email as string, credentials.password as string);
        
        if (user) return user;
        
        // إذا رجعنا null، صفحة اللوجن ستعرض خطأ "invalid_credentials"
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") return { ...token, ...session };
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user = { ...token };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login"
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { User } from "@/types"
// import api from "@/lib/api"
// import { CredentialsSignin } from "next-auth";
      
// export class InvalidCredentialsError extends CredentialsSignin {
//     code = "invalid_credentials";
//     message = "Invalid credentials";
//     status = 401;
//     cause?: (Record<string, unknown> & { err?: Error; }) | undefined;
//     name: string = "InvalidCredentialsError";
// }

// export class blockedAccount extends CredentialsSignin {
//     code = "blocked_account";
//     message = "Account is blocked";
//     status = 401;
//     cause?: (Record<string, unknown> & { err?: Error; }) | undefined;
//     name: string = "blockedAccountError";
// }

// const SignIn = async (email: string, password: string) => {
//     try {
//         console.log("🔐 SignIn attempt:", { email, timestamp: new Date().toISOString() });
        
//         // البحث عن اليوزر من البيانات الخارجية
//         const data = await api.request.post("user/login", {
//             email,
//             password,
//         });
        
//         console.log("✅ API Response:", data);
        
//         // تحقق من شكل الـ response
//         let user = null;
        
//         if (data?.result?.data) {
//             // إذا كان الـ response بالشكل المتوقع
//             user = data.result.data;
//         } else if (data?.data) {
//             // إذا كان الـ data مباشرة
//             user = data.data;
//         } else if (Array.isArray(data)) {
//             // إذا كان array، ابحث عن المستخدم
//             user = data.find((u: any) => u.email === email);
//         } else if (data?.email === email) {
//             // إذا كان object واحد مباشرة
//             user = data;
//         }
        
//         console.log("👤 User found:", user);
        
//         // ترجيع اليوزر لاستخدامه في authorize
//         return user;

//     } catch (error: any) {
//         console.error("❌ SignIn Error:", error);
//         if (error?.message === "حسابك غير مفعل") {
//             throw new blockedAccount(error?.message ?? "Wrong Email Or password");
//         } else {
//             throw new InvalidCredentialsError(error?.message ?? "Wrong Email Or password");
//         }
//     }
// };

// // Add a new function to verify token and get user data
// /* const verifyToken = async (token: string) => {
//     try {
//         const data = await api.request.get("user/profile/edit", {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         if (data?.result?.data) {
//             return { ...data?.result.data, token };
//         }
//         return null;
//     } catch (error) {
//         console.error("Token verification failed:", error);
//         return null;
//     }
// };
// */

// declare module "next-auth" {
//     /**
//      * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//      */
//     interface Session {
//         user: User
//     }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//                 // token: { label: "Token", type: "text" } // تهميش حقل التوكن من الـ UI
//             },
//             async authorize(credentials) {
//                 console.log("🔑 Authorize called with credentials:", { 
//                     email: credentials?.email, 
//                     hasPassword: !!credentials?.password,
//                     // hasToken: !!credentials?.token 
//                 });

//                 // Handle token-based auth (مهمش كما طلبت)
//                 /*
//                 if (credentials?.token) {
//                     try {
//                         const userData = await verifyToken(credentials.token as string);
//                         if (userData) {
//                             console.log("✅ Token verified successfully");
//                             return userData;
//                         }
//                     } catch (tokenError) {
//                         console.error("❌ Token verification failed:", tokenError);
//                         throw new Error("رمز الوصول غير صالح");
//                     }
//                 }
//                 */

//                 // Regular email/password auth
//                 const email = credentials?.email;
//                 const password = credentials?.password;

//                 if (email && password) {
//                     try {
//                         const data = await SignIn(email as string, password as string);
//                         const user: User = data;
                        
//                         // هنا نتحقق من التوكن الراجع من الـ API الأصلي
//                         if (user?.token) {
//                             console.log("✅ User authorized successfully");
//                             return user;
//                         } else if (data?.error) {
//                             console.error("❌ Error from SignIn:", data.error);
//                             throw new Error(data.error);
//                         } else if (data?.message) {
//                             console.error("❌ Message from SignIn:", data.message);
//                             throw new Error(data.message);
//                         } else {
//                             console.error("❌ No token returned from SignIn");
//                             throw new Error("خطأ في تسجيل الدخول");
//                         }
//                     } catch (authError: any) {
//                         console.error("❌ Authorization error:", authError);
//                         throw authError;
//                     }
//                 }
//                 throw new Error("بيانات الاعتماد غير صالحة");
//             },
//         }),
//     ],

//     callbacks: {
//         jwt({ token, user, trigger, session }) {
//             if (trigger === "update") {
//                 return { ...token, ...session };
//             }

//             if (user) {
//                 return { ...token, ...user };
//             }

//             return token;
//         },
//         session({ session, token }) {
//             if (token && session.user) {
//                 // @ts-ignore
//                 session.user = { ...token } as User;
//             }
//             return session;
//         },
//     },
//     pages: {
//         signIn: "/auth/login",
//         newUser: "/auth",
//         error: "/auth/login"
//     },
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// })