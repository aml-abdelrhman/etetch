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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
const news = [
  {
    title: "أفضل العقارات المعروضة في حي الرمال بالرياض: وجهة...",
    img: "/gallary-section-img.png",
    description:
      "الجادة الأولى للتطوير العقاري هي أحد الشركات المتميزة في الاستثمار والتطوير العقاري، والتي يقع مقرها في الرياض. حققت الشركة نمو متسارعا لتصبح إحدى الشركات البارزة والرائدة في صناعة فرص الا...",
    created_at: "2026-02-11",
  },
  {
    title: "أفضل العقارات المعروضة في حي الرمال بالرياض: وجهة...",
    img: "/gallary-section-img.png",
    description:
      "الجادة الأولى للتطوير العقاري هي أحد الشركات المتميزة في الاستثمار والتطوير العقاري، والتي يقع مقرها في الرياض. حققت الشركة نمو متسارعا لتصبح إحدى الشركات البارزة والرائدة في صناعة فرص الا...",
    created_at: "2026-02-11",
  },
  {
    title: "أفضل العقارات المعروضة في حي الرمال بالرياض: وجهة...",
    img: "/gallary-section-img.png",
    description:
      "الجادة الأولى للتطوير العقاري هي أحد الشركات المتميزة في الاستثمار والتطوير العقاري، والتي يقع مقرها في الرياض. حققت الشركة نمو متسارعا لتصبح إحدى الشركات البارزة والرائدة في صناعة فرص الا...",
    created_at: "2026-02-11",
  },
  {
    title: "أفضل العقارات المعروضة في حي الرمال بالرياض: وجهة...",
    img: "/gallary-section-img.png",
    description:
      "الجادة الأولى للتطوير العقاري هي أحد الشركات المتميزة في الاستثمار والتطوير العقاري، والتي يقع مقرها في الرياض. حققت الشركة نمو متسارعا لتصبح إحدى الشركات البارزة والرائدة في صناعة فرص الا...",
    created_at: "2026-02-11",
  },
];

const NewsSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section className="min-h-[90svh] bg-main-200 relative overflow-hidden">
      <img
        src="/section-bg-dark-caramel.svg"
        alt="Section Background"
        className="absolute bottom-0 start-0 z-5 pointer-events-none"
      />
      <div className="py-[17svh] relative z-10 container">
        <Carousel
          opts={{
            align: "center",

            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          className="w-full"
        >
          <div className="flex items-center sm:justify-between gap-5 max-sm:flex-col flex-wrap mb-[7svh]">
            <div className="flex items-center gap-3 max-sm:flex-col">
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("Hemma News")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex">
              <CarouselNext className="static text-black border-black size-15 translate-y-0" />
              <CarouselPrevious className="static text-black border-black size-15 translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {news.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-[85%] lg:basis-1/2 2xl:basis-1/3 min-h-fit"
              >
                <Link href={`/news/${item.title}`}>
                  <Card className="h-full border-none p-0 text-cyan-950 bg-transparent">
                    <CardHeader className="bg-[url('/statistics-bg.svg')] bg-cover bg-center rounded-2xl min-h-[30svh] relative">
                      <Badge
                        variant="secondary"
                        className="text-cyan-950/40 absolute top-5 start-5"
                      >
                        {t("Articals")}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-cyan-950/40">
                        {moment(item.created_at).format("DD MMMM YYYY")}
                      </p>
                      <h3 className="text-xl xl:text-2xl font-medium leading-11">
                        {item.title}
                      </h3>
                      <p className="text-sm text-cyan-950/40 line-clamp-3">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
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

export default NewsSection;
