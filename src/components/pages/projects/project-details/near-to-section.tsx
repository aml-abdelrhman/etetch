import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const NearToSection = () => {
  const t = useTranslations();
  const locations = [
    {
      name: t("Abu Bakr Al Siddiq Road"),
      distance: t("minutes", { count: 3 }),
    },
    {
      name: t("Princess Nourah bint Abdulrahman University"),
      distance: t("minutes", { count: 14 }),
    },
    {
      name: t("King Khalid International Airport"),
      distance: t("minutes", { count: 24 }),
    },
    { name: t("Imam Abdulaziz Road"), distance: t("minutes", { count: 24 }) },
    { name: t("King Salman Road"), distance: t("minutes", { count: 3 }) },
    { name: t("King Saud Road"), distance: t("minutes", { count: 24 }) },
  ];
  return (
    <section className="min-h-[90svh] bg-main-200 relative overflow-hidden">
      <div className="container py-[17svh] relative z-10">
        <div className="flex items-center gap-3 max-sm:flex-col mb-[7svh] lg:-mb-[7svh]">
          <img
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none"
          />
          <h2 className="section-title">{t("Near to")}</h2>
        </div>
        <img
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute top-0 start-0 z-5 pointer-events-none"
        />
        <div className="grid lg:grid-cols-2 gap-7 lg:gap-5 relative z-10">
          <div className="grid lg:grid-cols-2 gap-3 lg:gap-5 place-self-end order-2 lg:order-1 w-full">
            {locations.map((location, index) => (
              <div
                key={index}
                className="flex items-center gap-5 min-w-fit w-full text-primary"
              >
                <MapPinIcon className="rounded-full p-2.5 size-10 border border-primary/20 min-w-fit" />
                <div className="space-y-0.5 text-start">
                  <p className="text-xs font-thin">{location.distance}</p>
                  <a href="#" className="text-lg lg:text-xl font-medium hover:underline">
                    {location.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <Image
            src="/near-to-section-img.svg"
            alt="Near To"
            width={100}
            height={100}
            className="block w-full h-auto order-1 lg:order-2"
          />
        </div>
      </div>
    </section>
  );
};

export default NearToSection;
