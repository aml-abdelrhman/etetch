import { getTranslations } from "next-intl/server";
import Image from "next/image";

const TermsAndConditions = async () => {
  const t = await getTranslations();

  return (
    <main className="bg-main-50 min-h-screen pb-[7svh]">
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
          <h1 className="section-title"> {t("Terms and Conditions")}</h1>
          <p className="max-w-2xl mx-auto">
            {" "}
            {t("terms_conditions_description")}
          </p>
        </div>
      </div>
      <div className="container max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-border/50 -mt-[9svh] z-50 relative">
        <article
          className="prose prose-slate max-w-none 
                  prose-headings:text-primary prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                  prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                  prose-li:text-slate-600 prose-li:mb-2
                  prose-strong:text-primary"
          dangerouslySetInnerHTML={{
            __html: t.raw("terms_conditions_content"),
          }}
        />
      </div>
    </main>
  );
};

export default TermsAndConditions;
