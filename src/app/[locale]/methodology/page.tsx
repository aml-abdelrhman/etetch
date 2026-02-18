import { getTranslations } from "next-intl/server";
import Image from "next/image";

const MethodologyPage = async () => {
  const t = await getTranslations();
  return (
    <section className="bg-main-50 min-h-screen">
      <div className="bg-main-200 py-[20svh] relative">
        <Image
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute top-0 start-0 w-fit z-5 pointer-events-none"
          width={898}
          height={459}
        />
        <div className="container flex flex-col items-center text-center gap-5 z-10 relative">
          <Image
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none w-16"
            width={60}
            height={60}
          />
          <h1 className="section-title">{t("Hemma Methodology")}</h1>
          <p className="max-w-2xl mx-auto">
            {t(
              "Our methodology is based on three pillars quality sustainability and innovation",
            )}
          </p>
        </div>
      </div>
      <article className="container py-11 max-w-4xl">
        <div
          className="article prose lg:prose-xl leading-relaxed prose-img:rounded-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: t.raw("methodology_content") }}
        />
      </article>
    </section>
  );
};

export default MethodologyPage;
