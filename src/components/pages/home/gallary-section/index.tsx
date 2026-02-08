import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryImages = [
  "/gallary-section-img.png",
  "/gallary-section-img(2).png",
  "/gallary-section-img(3).png",
];

const GallarySection = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section className="min-h-[90svh] bg-background relative overflow-hidden">
      <img
        src="/section-bg-white.svg"
        alt="Section Background"
        className="absolute top-0 start-0 z-5 pointer-events-none"
      />
      <div className="py-[17svh] relative z-10">
        <Carousel
          opts={{
            align: "center",
            loop: true,
            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          className="w-full max-md:px-3"
        >
          <div className="container flex items-center justify-between gap-5 flex-wrap mb-[7svh]">
            <div className="flex items-center gap-3">
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("Photo Gallery")}</h2>
            </div>
            <div className="flex items-center gap-3">
              <CarouselNext className="static translate-y-0" />
              <CarouselPrevious className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {galleryImages.map((src, index) => (
              <CarouselItem
                key={index}
                className="md:basis-[90%] lg:basis-[60%]"
              >
                <div className="group relative h-full overflow-hidden rounded-4xl">
                  <img
                    src={src}
                    alt={`Gallery Image`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default GallarySection;
