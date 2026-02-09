import { useTranslations } from "next-intl";

const HomeHeroSection = () => {
  const t = useTranslations();
  return (
    <section className="bg-[url('/home-hero-bg.svg')] bg-bottom bg-contain bg-no-repeat min-h-svh w-full relative">
      <div className="bg-linear-to-l from-[#60708E] via-[#8199BE] to-transparent h-full w-[32svw] absolute top-0 start-0 z-10 max-xl:hidden" />
      <div className="bg-linear-to-r from-[#60708E] via-[#8199BE] to-transparent h-full w-[32svw] absolute top-0 end-0 z-10 max-xl:hidden" />
    </section>
  );
};

export default HomeHeroSection;
