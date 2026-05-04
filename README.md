# Etech Learning Management System (LMS) - Enterprise Portal

## 🏛️ نظرة عامة على المشروع (Executive Summary)

تعد منصة **Etech** الواجهة الرقمية الرائدة للحلول التعليمية المتكاملة، حيث تم تصميمها بأعلى المعايير الهندسية لتلبية احتياجات المؤسسات التعليمية الحديثة في عصر التحول الرقمي. يهدف هذا المشروع إلى تقديم بيئة تعليمية ذكية، تفاعلية، وآمنة تضمن تجربة مستخدم (UX) استثنائية عبر مختلف الأجهزة والمنصات.

تم بناء المنصة باستخدام معمارية **Next.js 14+** مع التركيز على الأداء العالي (High Performance)، القابلية للتوسع (Scalability)، وسهولة الصيانة (Maintainability).

## 🎯 الرؤية والقيمة المضافة

- **التحول الرقمي التعليمي**: تمكين المؤسسات من إدارة المحتوى والطلاب بفعالية فائقة عبر لوحات تحكم ذكية.
- **الأداء الأقصى**: استغلال تقنيات الرندرة الحديثة (Server Components) لضمان سرعة تحميل لحظية.
- **التصميم الشامل (Inclusive Design)**: واجهة تدعم تعدد اللغات (RTL/LTR) والوصول الشامل لجميع المستخدمين.
- **الأمان المؤسسي**: تطبيق معايير حماية متقدمة للبيانات والهويات الرقمية.

## 🚀 التقنيات المستخدمة (Tech Stack)

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/) - المعيار الصناعي لتطبيقات الويب الحديثة.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - لضمان ثبات الكود (Type Safety) وتقليل الأخطاء البرمجية.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - لبناء واجهات عصرية متجاوبة بسرعة وكفاءة.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) - نظام توثيق آمن يدعم الجلسات المشفرة.
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) - لإدارة حالة التطبيق بشكل خفيف وفعال.
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) مع [Zod](https://zod.dev/) للتحقق من البيانات.
- **Icons**: [Lucide React](https://lucide.dev/)

## ✨ المميزات الرئيسية

### 🛡️ الحماية وصلاحيات الوصول (Security & RBAC)
- تطبيق نظام **Role-Based Access Control (RBAC)** لإدارة صلاحيات المستخدمين (مسؤول، معلم، طالب) بدقة متناهية.
- حماية المسارات على مستوى الـ Middleware لضمان أقصى درجات الأمان.

### 🌍 تجربة مستخدم عالمية (Global UX)
- **نظام تدويل متكامل (i18n)**: دعم كامل للغتين العربية والإنجليزية مع تحويل تلقائي للواجهات (RTL/LTR).
- **الوضع الذكي (Theming)**: دعم الوضع الليلي والنهاري للحفاظ على راحة عين المستخدم وتقليل استهلاك الطاقة.

### ⚡ الهندسة البرمجية (Engineering Excellence)
- **التحقق من البيانات**: استخدام Zod لضمان صحة البيانات المدخلة قبل إرسالها للـ API، مما يقلل من أخطاء الخادم.
- **الواجهات التفاعلية**: استخدام Framer Motion لإضافة لمسات حركية تزيد من جاذبية المنصة.
- **سرعة الوصول**: تحسين الصور والخطوط (Optimization) لضمان تحقيق أعلى درجات تقييم Core Web Vitals.

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
