import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnitCard from "./unit-card";
import { Unit } from "@/types";

const UnitsSection = () => {
  const t = useTranslations();
  const demoUnit: Unit = {
    id: 1,
    unit_number: "#B1",
    title: "Unit 1",
    description: "Description of unit 1",
    image: "/unit.png",
    status: "available",
    price: "100000",
    floor: "1",
    area: "100",
    rooms: 2,
    created_at: "2022-01-01",
    updated_at: "2022-01-01",
  };
  const reservedUnit: Unit = {
    id: 1,
    unit_number: "#B1",
    title: "Unit 1",
    description: "Description of unit 1",
    image: "/unit.png",
    status: "reserved",
    price: "100000",
    floor: "1",
    area: "100",
    rooms: 2,
    created_at: "2022-01-01",
    updated_at: "2022-01-01",
  };
  return (
    <div className="min-h-[90svh] bg-main-50 relative">
      <img
        src="/section-bg-caramel.svg"
        alt=""
        className="absolute top-0 start-0 z-5"
      />
      <div className="container py-[17svh] relative z-10  ">
        <Tabs defaultValue="all" className="flex-col">
          <div className="flex items-center justify-between gap-5 flex-wrap mb-[7svh]">
            <div className="flex items-center gap-3">
              <img src="/section-logo.svg" alt="" />
              <h2 className="section-title">{t("Units Schedule")}</h2>
            </div>
            <TabsList >
              <TabsTrigger value="all">{t("All")}</TabsTrigger>
              <TabsTrigger value="available">{t("Available")}</TabsTrigger>
              <TabsTrigger value="sold">{t("Sold")}</TabsTrigger>
              <TabsTrigger value="reserved">{t("Reserved")}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {Array.from({ length: 2 }).map((_, index) => (
                <UnitCard key={index} unit={demoUnit} />
              ))}
              {Array.from({ length: 4 }).map((_, index) => (
                <UnitCard key={index} unit={reservedUnit} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="available">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <UnitCard key={index} unit={reservedUnit} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sold">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <UnitCard key={index} unit={reservedUnit} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reserved">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <UnitCard key={index} unit={reservedUnit} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UnitsSection;
