import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UnitsSection = () => {
  const t = useTranslations();
  return (
    <div className="h-[90svh] bg-main-50 relative">
      <img src="/section-bg.svg" alt="" className="absolute top-0 start-0 z-5" />
      <div className="container py-[17svh] relative z-10  ">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <div className="flex items-center gap-3">
              <img src="/section-logo.svg" alt="" />
              <h2 className="section-title">{t("Units Schedule")}</h2>
            </div>
            <TabsList>
              <TabsTrigger value="all">{t("All")}</TabsTrigger>
              <TabsTrigger value="available">{t("Available")}</TabsTrigger>
              <TabsTrigger value="sold">{t("Sold")}</TabsTrigger>
              <TabsTrigger value="reserved">{t("Reserved")}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="mt-[7svh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold">Unit {index + 1}</h3>
                  <p className="text-gray-600">
                    Description of unit {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="available">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold">Unit {index + 1}</h3>
                  <p className="text-gray-600">
                    Description of unit {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sold">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold">Unit {index + 1}</h3>
                  <p className="text-gray-600">
                    Description of unit {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reserved">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="text-lg font-semibold">Unit {index + 1}</h3>
                  <p className="text-gray-600">
                    Description of unit {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UnitsSection;
