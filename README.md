# Etech Front-end Portal

منصة تعليمية متطورة مبنية باستخدام تقنيات الويب الحديثة، توفر تجربة مستخدم سلسة مع دعم كامل للغات المتعددة والوضع الليلي.

## 🚀 التقنيات المستخدمة (Tech Stack)

- **Framework**: [Next.js 14/15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) مع [Zod](https://zod.dev/) للتحقق من البيانات.
- **Icons**: [Lucide React](https://lucide.dev/)

## ✨ المميزات الرئيسية

- **نظام توثيق متكامل**: دعم تسجيل الدخول بناءً على الأدوار (Admin, Teacher, Student).
- **دعم اللغات (i18n)**: دعم كامل للغتين العربية والإنجليزية مع مراعاة اتجاه النص (RTL/LTR).
- **الوضع الليلي (Dark Mode)**: واجهة مستخدم متكيفة بالكامل مع تفضيلات المستخدم.
- **تجربة مستخدم محسنة**: 
  - حقول إدخال ذكية مع إمكانية إظهار/إخفاء كلمة المرور.
  - خاصية "تذكرني" (Remember Me) باستخدام LocalStorage.
  - تحقُّق فوري من صحة البيانات (Client-side validation).
  - تأثيرات حركية سلسة وتصميم عصري (Glassmorphism).

## 📂 هيكلية المجلدات

```text
src/
├── app/[locale]/      # صفحات التطبيق (يدعم التدويل)
│   ├── auth/          # صفحات التوثيق (Login, Register)
│   └── dashboard/     # لوحات التحكم حسب الدور
├── store/             # إدارة الحالة العالمية (Zustand)
├── lib/               # الدوال المساعدة والإعدادات (Utils)
├── components/        # المكونات القابلة لإعادة الاستخدام
└── messages/          # ملفات الترجمة (JSON)
```

## 🛠️ التشغيل والتثبيت

1. قم بتحميل المستودع:
   ```bash
   git clone <repository-url>
   ```
2. تثبيت المكتبات:
   ```bash
   npm install
   # أو
   yarn install
   ```
3. إعداد متغيرات البيئة:
   قم بإنشاء ملف `.env.local` وأضف الإعدادات اللازمة (NextAuth secret, API URL).

4. تشغيل المشروع في بيئة التطوير:
   ```bash
   npm run dev
   ```

## 🔑 صلاحيات الوصول (RBAC)
يتم توجيه المستخدم تلقائياً بعد تسجيل الدخول بناءً على دوره:
- **المسؤول**: `/dashboard/admin`
- **المعلم**: `/dashboard/teacher`
- **الطالب**: `/dashboard/student`
