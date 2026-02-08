import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const NearToSection = () => {
  const t = useTranslations();

  return (
    <section className="min-h-[90svh] bg-main-200 relative">
      <div className="container py-[17svh] relative z-10">
        <div className="flex items-center gap-3 max-sm:flex-col -mb-[7svh]">
          <img
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none"
          />
          <h2 className="section-title">{t("Near to")}</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-5  relative z-10">
          <img
            src="/section-bg-dark-caramel.svg"
            alt="Section Background"
            className="absolute top-0 start-0 z-5 pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};

export default NearToSection;
