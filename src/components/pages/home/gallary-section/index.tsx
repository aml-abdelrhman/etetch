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
  "/gallary-section-img.png",
  "/gallary-section-img.png",
  "/gallary-section-img.png",
  "/gallary-section-img.png",
  "/gallary-section-img.png",
];

const GallarySection = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="min-h-[90svh] bg-background relative overflow-hidden">
      <img
        src="/section-bg-white.svg"
        alt="Section Background"
        className="absolute top-0 start-0 z-5"
      />
      <div className="container py-[17svh] relative z-10  ">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          className="w-full"
        >
          <div className="flex items-center justify-between gap-5 flex-wrap mb-[7svh]">
            <div className="flex items-center gap-3">
              <img src="/section-logo.svg" alt="Section Logo" className="animate-pulse" />
              <h2 className="section-title">{t("Photo Gallery")}</h2>
            </div>
            <div className="flex items-center gap-3">
              <CarouselNext className="static translate-y-0" />
              <CarouselPrevious className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="-ms-4 h-[45svh]">
            {galleryImages.map((src, index) => (
              <CarouselItem
                key={index}
                className="pe-4 lg:basis-[90%]"
              >
                <div className="group relative h-full overflow-hidden rounded-4xl border-4 border-white shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
                  <img
                    src="/gallary-section-img.png"
                    alt={`Gallery Image`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-white font-medium text-lg">
                      {t("View Modern Interior")}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default GallarySection;
