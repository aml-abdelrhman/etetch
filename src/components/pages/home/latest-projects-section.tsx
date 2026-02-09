import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon } from "lucide-react";

const projects = [
  {
    name: "أدوار مشروع تجريبي – النفل الرياض",
    img: "/gallary-section-img.png",
    sold_unites_percentage: 40,
    location: "الرياض",
    tags: ["أرض", "شقة", "فيلا"],
    price: "1,759,000 - 2,099,000",
    units_count: 100,
    area: "3,300",
  },
  {
    name: "أدوار مشروع تجريبي – النفل الرياض",
    img: "/gallary-section-img(2).png",
    sold_unites_percentage: 57,
    location: "الرياض",
    tags: ["أرض", "شقة", "فيلا"],
    price: "1,759,000 - 2,099,000",
    units_count: 100,
    area: "3,300",
  },
  {
    name: "أدوار مشروع تجريبي – النفل الرياض",
    img: "/gallary-section-img(3).png",
    sold_unites_percentage: 100,
    location: "الرياض",
    tags: ["أرض", "شقة", "فيلا"],
    price: "1,759,000 - 2,099,000",
    units_count: 100,
    area: "3,300",
  },
];

const LatestProjectsSection = () => {
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

            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          className="w-full"
        >
          <div className="flex items-center sm:justify-between gap-5 max-sm:flex-col flex-wrap mb-[7svh] container">
            <div className="flex items-center gap-3 max-sm:flex-col">
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("Latest Projects")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex">
              <CarouselNext className="static translate-y-0" />
              <CarouselPrevious className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[57svh]">
            {projects.map((project, index) => (
              <CarouselItem
                key={index}
                className="basis-[85%] lg:basis-[60%] 2xl:basis-[50%]"
              >
                <Link
                  href={`/projects/${project.name}`}
                  className="group relative h-full overflow-hidden rounded-4xl block"
                >
                  <div className="">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="text-sm font-medium text-primary/40 flex items-center gap-2"
                      >
                        <MapPinIcon className="size-5 text-primary" />
                        {project.location}
                      </Badge>
                      {project.tags.map((tag, index) => (
                        <Badge
                          variant="secondary"
                          key={index}
                          className="text-sm font-medium text-primary/40"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <img
                      src={project.img}
                      alt={`Project Image`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center gap-3 justify-center md:hidden mt-9">
            <CarouselNext className="static translate-y-0" />
            <CarouselPrevious className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default LatestProjectsSection;
