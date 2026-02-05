import { useTranslations } from "next-intl";
import React from "react";

const UnitsSection = () => {
  const t = useTranslations();
  return (
    <div className="h-[90svh] bg-main-50 relative">
      <img src="/section-bg.svg" alt="" className="absolute top-0 start-0" />
      <div className="container py-[17svh]">
        <div className="flex items-center gap-3">
          <img src="/section-logo.svg" alt="" />
          <h2 className="section-title">{t("Units Schedule")}</h2>
        </div>
      </div>
    </div>
  );
};

export default UnitsSection;
