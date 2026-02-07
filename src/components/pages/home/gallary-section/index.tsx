import { useTranslations } from "next-intl";

const GallarySection = () => {
  const t = useTranslations();

  return (
    <div className="min-h-[90svh] bg-background relative">
      <img
        src="/section-bg-white.svg"
        alt=""
        className="absolute top-0 start-0 z-5"
      />
      <div className="container py-[17svh] relative z-10  ">
        <div className="flex items-center justify-between gap-5 flex-wrap mb-[7svh]">
          <div className="flex items-center gap-3">
            <img src="/section-logo.svg" alt="" />
            <h2 className="section-title">{t("Photo Gallery")}</h2>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default GallarySection;
