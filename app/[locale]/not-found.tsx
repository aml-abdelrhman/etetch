"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-dvh -mt-5 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div>
          <h1 className="text-9xl font-bold text-zinc-200 dark:text-zinc-700">
            404
          </h1>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-100 mt-8">
            {t("title")}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mt-4">
            {t("description")}
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.back()}
            className="font-semibold"
          >
            {t("backButton")}
          </Button>
          <Button
            size="lg"
            onClick={() => router.push("/")}
            className="font-semibold"
          >
            {t("homeButton")}
          </Button>
        </div>

        <div className="mt-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-300 dark:border-zinc-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-linear-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 text-zinc-500 dark:text-zinc-400">
                {t("ornamentalText")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
