import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ETECH AI Learning Platform',
    short_name: 'ETECH',
    description: 'اكتشف حقبة جديدة من التعليم المدعوم بالذكاء الاصطناعي مع منصة إي تيك',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617', // متوافق مع الـ Dark Mode اللي بتستخدمه
    theme_color: '#9333ea',      // لون Purple-600 المميز لبراند ETECH
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}