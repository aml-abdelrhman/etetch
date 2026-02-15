import React from "react";
import { Unit } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BedIcon, VectorSquareIcon } from "lucide-react";
import { StarisUpIcon } from "@/icons";

const FutureItemCard = ({
  Icon,
  value,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  value: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2 bg-[#F9F9F9] rounded-lg px-2 py-3 flex-1">
      <Icon className="size-4 text-primary" />
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
};

const UnitCard = ({ unit }: { unit: Unit }) => {
  const t = useTranslations();
  const isReserved = unit.status === "reserved";
  return (
    <Card className="relative overflow-hidden">
      {isReserved && (
        <div className="absolute top-0 start-0 w-full h-full bg-primary-foreground/70 z-10 pointer-events-none" />
      )}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-inter">
          {unit.unit_number || t("N/A")}
        </CardTitle>
        <Badge variant={isReserved ? "info" : "success"}>
          {t(unit.status)}
        </Badge>
      </CardHeader>
      <CardContent className="border-y-2 border-border py-3 mx-2 lg:mx-4">
        <p className="text-2xl lg:text-3xl font-medium text-center">
          {unit.price ? unit.price.toLocaleString() : t("Price on request")}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 items-center justify-center">
        <div className="flex items-center gap-5 w-full">
          <FutureItemCard
            Icon={BedIcon}
            value={unit.rooms ? String(unit.rooms) : "0"}
          />
          <FutureItemCard Icon={VectorSquareIcon} value={unit.area || "0"} />
          <FutureItemCard Icon={StarisUpIcon} value={unit.floor || "0"} />
        </div>
        {!isReserved && (
          <Button variant="flat" size="lg" className="w-full">
            {t("View details")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default UnitCard;
