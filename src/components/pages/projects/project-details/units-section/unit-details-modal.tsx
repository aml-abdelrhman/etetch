"use client";

import React from "react";
import { Unit } from "@/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ChevronLeft, Download } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { WhatsAppIcon } from "@/icons";
import { formatNumber } from "@/lib/utils";
import { pdf } from "@react-pdf/renderer";
import UnitQuotationPDF from "@/components/pdf/unit-quotation";
import { useLocale } from "next-intl";

interface UnitDetailsModalProps {
  unit: Unit;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
}

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <div className="py-3 flex items-center justify-between border-b last:border-0 border-border/50">
    <span className="text-base font-bold text-foreground">{label}:</span>
    <div className="flex items-center gap-1">
      <span className="text-base font-medium text-foreground">
        {value || "---"}
      </span>
    </div>
  </div>
);

const UnitDetailsModal = ({
  unit,
  isOpen,
  onOpenChange,
  projectName,
}: UnitDetailsModalProps) => {
  const t = useTranslations();
  const locale = useLocale();

  const handleDownload = async () => {
    try {
      const blob = await pdf(
        <UnitQuotationPDF
          unit={unit}
          locale={locale}
          projectName={projectName}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `unit-${unit.unit_number || unit.id}-quotation.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">{t("Unit Details")}</DialogTitle>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-none gap-0 bg-[#FCFCFC]">
        <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-6">
          {/* <button
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors w-fit"
          >
            <ChevronLeft className="size-4" />
            {t("Back")}
          </button> */}

          <div className="bg-white rounded-xl border border-border/60 p-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold">#{unit.unit_number}</h3>
            <div className="flex items-center gap-2">
              <PDFDownloadLink
                document={
                  <UnitQuotationPDF
                    unit={unit}
                    locale={locale}
                    projectName={projectName}
                  />
                }
                fileName={`unit-${unit.unit_number || unit.id}-quotation.pdf`}
              >
                {({ loading }) => (
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-11 rounded-lg bg-main-200 text-primary flex-col gap-0"
                    isLoading={loading}
                  >
                    <p className="text-xs font-inter font-semibold">PDF</p>
                    <Download className="size-5" />
                  </Button>
                )}
              </PDFDownloadLink>
              <Badge
                variant={
                  unit.status === "sold"
                    ? "destructive"
                    : unit.status === "reserved"
                      ? "info"
                      : "success"
                }
                className="h-10 px-4 text-sm font-semibold rounded-lg"
              >
                {t(unit.status)}
              </Badge>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border/60 px-6 py-2">
            <DetailItem label={t("Floor")} value={unit.floor} />
            <DetailItem
              label={t("Area")}
              value={unit.area ? `${unit.area} m²` : "0 m²"}
            />
            <DetailItem
              label={t("Private")}
              value={unit.private_area ? `${unit.private_area} m²` : "0 m²"}
            />
            <DetailItem
              label={t("Total Area")}
              value={unit.total_area ? `${unit.total_area} m²` : "0 m²"}
            />
            <DetailItem label={t("Rooms")} value={unit.rooms} />
            <DetailItem label={t("View")} value={unit.view} />
            <DetailItem
              label={t("Price")}
              value={
                unit.price
                  ? `${formatNumber(Number(unit.price))} ${t("SAR")}`
                  : t("Price on request")
              }
            />
          </div>

          <div className="bg-white rounded-xl border border-border/60 p-6 lg:p-8 flex flex-col items-center gap-6 text-center">
            <p className="text-base text-foreground font-semibold">
              {t("Are you interested")}{" "}
              <span className="text-foreground/70 font-normal">
                {t("Contact our sales representative over WhatsApp")}
              </span>
            </p>
            <Button
              startContent={<WhatsAppIcon className="size-8" />}
              size="lg"
              className="w-full rounded-2xl"
            >
              {t("Whatsapp")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnitDetailsModal;
