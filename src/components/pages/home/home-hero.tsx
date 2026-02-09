import { useTranslations } from "next-intl";

const HomeHeroSection = () => {
  const t = useTranslations();
  return (
    <section className="bg-[url('/home-hero-bg.svg')] bg-top bg-cover bg-no-repeat min-h-svh w-full relative"></section>
  );
};

export default HomeHeroSection;
