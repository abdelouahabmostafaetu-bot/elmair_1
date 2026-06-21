# مركز المعيار للبحوث والدراسات — Al-Meiyar Center

موقع احترافي ثنائي اللغة (عربي / إنجليزي) مبني بـ **Next.js + MongoDB + Clerk**.
A professional bilingual (Arabic / English) website built with **Next.js + MongoDB + Clerk**.

---

## ✨ المميزات / Features

- صفحات: الرئيسية، عن المركز، الخدمات، أعمالنا، المدونة، الفعاليات، تواصل معنا.
- تصميم أنيق متجاوب (هاتف + حاسوب)، خطان عربيان: **El Messiri** للعناوين و **Tajawal** للنصوص.
- تبديل اللغة عربي/إنجليزي مع دعم الاتجاه (RTL).
- لوحة تحكم للمدير `/admin` (تسجيل دخول عبر Clerk):
  - إنشاء / تعديل / حذف المقالات والفعاليات.
  - قراءة رسائل التواصل (محفوظة بشكل دائم، لا تُحذف).
  - إضافة / إزالة مدراء آخرين (المدير العام فقط).
- نموذج تواصل يحفظ كل الطلبات في قاعدة بيانات MongoDB.

---

## 🚀 التشغيل خطوة بخطوة (للمبتدئين)

### 1) ثبّت Node.js
حمّل وثبّت **Node.js 18+** من https://nodejs.org

### 2) ثبّت الحزم / Install packages
افتح الطرفية (Terminal) داخل مجلد المشروع ثم اكتب:
```bash
npm install
```

### 3) ملف الأسرار `.env`
الملف موجود بالفعل داخل المشروع ويحتوي مفاتيحك. لا تشاركه مع أحد!
(تجد نسخة فارغة باسم `.env.example` للتوضيح.)

### 4) شغّل الموقع محلياً / Run locally
```bash
npm run dev
```
ثم افتح المتصفح على: http://localhost:3000

---

## 🔑 لوحة التحكم / Admin

- ادخل إلى: `http://localhost:3000/admin`
- سيُطلب منك تسجيل الدخول عبر Clerk.
- **المدير العام**: `edumoustapha60@gmail.com` (محدد في `.env` بالمتغير `SUPER_ADMIN_EMAIL`).
- لإضافة مدير جديد: من صفحة "المدراء"، أضف بريده الإلكتروني، ثم يسجّل هو الدخول بنفس البريد عبر Clerk.

> مهم: في لوحة Clerk (dashboard.clerk.com) فعّل طريقة تسجيل الدخول بالبريد الإلكتروني، وتأكد أن البريد الذي تسجّل به هو نفسه بريد المدير.

---

## ☁️ النشر على Vercel / Deploy to Vercel

1. أنشئ حساباً على https://vercel.com
2. ارفع المشروع إلى GitHub (أو استورد المجلد مباشرة في Vercel).
3. في Vercel: **New Project → Import**.
4. في خطوة **Environment Variables**، أضف نفس المتغيرات الموجودة في ملف `.env`:
   - `MONGODB_URI`
   - `MONGODB_DB`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `SUPER_ADMIN_EMAIL`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/sign-in`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` = `/admin`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` = `/admin`
5. اضغط **Deploy**. خلال دقائق سيكون موقعك على الإنترنت.

---

## 🗄️ قاعدة البيانات MongoDB Atlas

مفتاح الاتصال موجود في `.env` (المتغير `MONGODB_URI`).
إذا أردت قاعدة بيانات خاصة بك:
1. أنشئ حساباً مجانياً على https://www.mongodb.com/atlas
2. أنشئ Cluster مجاني، ثم مستخدم قاعدة بيانات.
3. من **Network Access** أضف `0.0.0.0/0` (للسماح بالوصول)، أو IP الخاص بـ Vercel.
4. انسخ "Connection String" وضعه مكان `MONGODB_URI`.

---

## 📁 بنية المشروع / Project structure

```
src/
  app/
    (site)/        صفحات الموقع العامة (الرئيسية، عن، خدمات، أعمال، مدونة، فعاليات، تواصل)
    admin/         لوحة تحكم المدير
    api/           واجهات برمجية (blog, events, contact, admins)
    sign-in/       صفحة تسجيل الدخول (Clerk)
  components/      مكوّنات الواجهة (Navbar, Footer, Hero, البطاقات...)
  i18n/            ملفات الترجمة (عربي / إنجليزي)
  lib/             الاتصال بقاعدة البيانات + أدوات مساعدة
  models/          نماذج بيانات MongoDB (مقال، فعالية، رسالة، مدير)
public/
  images/          الصور
  logo.png         الشعار
```

---

## 🔒 تنبيه أمني مهم / Security note

مفاتيحك السرية موجودة داخل `.env`. **لا ترفع هذا الملف إلى GitHub** (تم استثناؤه تلقائياً عبر `.gitignore`).
إذا سبق أن شاركت المفاتيح مع أي شخص، يُنصح بشدة بتغييرها (Rotate) من لوحة Clerk ومن MongoDB Atlas.

Your secret keys live in `.env`. **Never push it to GitHub** (already excluded via `.gitignore`).
If these keys were ever shared, rotate them in the Clerk dashboard and MongoDB Atlas.

---

بالتوفيق! 🌟  Good luck!
