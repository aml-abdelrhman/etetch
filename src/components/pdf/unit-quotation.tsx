"use client";

import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { Unit } from "@/types";
import moment from "moment";

Font.register({
  family: "Alexandria",
  fonts: [
    {
      src: "../../app/fonts/Alexandria/Alexandria-ExtraLight.ttf",
      fontWeight: 200,
    },
    { src: "../../app/fonts/Alexandria/Alexandria-Light.ttf", fontWeight: 300 },
    {
      src: "../../app/fonts/Alexandria/Alexandria-Regular.ttf",
      fontWeight: 400,
    },
    {
      src: "../../app/fonts/Alexandria/Alexandria-Medium.ttf",
      fontWeight: 500,
    },
    {
      src: "../../app/fonts/Alexandria/Alexandria-SemiBold.ttf",
      fontWeight: 600,
    },
    { src: "../../app/fonts/Alexandria/Alexandria-Bold.ttf", fontWeight: 700 },
    {
      src: "../../app/fonts/Alexandria/Alexandria-ExtraBold.ttf",
      fontWeight: 800,
    },
    { src: "../../app/fonts/Alexandria/Alexandria-Black.ttf", fontWeight: 900 },
  ],
});

interface UnitQuotationProps {
  unit: Unit;
  locale: string;
  projectName: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Alexandria",
  },
  header: {
    backgroundColor: "#683c21",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderRadius: 4,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 60,
    height: 40,
  },
  metaInfo: {
    marginBottom: 20,
  },
  metaText: {
    fontSize: 10,
    color: "#64748b",
    marginBottom: 4,
  },
  metaTextRTL: {
    fontSize: 10,
    color: "#64748b",
    marginBottom: 4,
    textAlign: "right",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 30,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableRowReverse: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableCellLabel: {
    width: "30%",
    backgroundColor: "#f8fafc",
    padding: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e293b",
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
  },
  tableCellLabelRTL: {
    width: "30%",
    backgroundColor: "#f8fafc",
    padding: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#1e293b",
    borderLeftWidth: 1,
    borderLeftColor: "#e2e8f0",
    textAlign: "right",
  },
  tableCellValue: {
    width: "70%",
    padding: 10,
    fontSize: 12,
    color: "#334155",
  },
  tableCellValueRTL: {
    width: "70%",
    padding: 10,
    fontSize: 12,
    color: "#334155",
    textAlign: "right",
  },
  disclaimerSection: {
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 4,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e293b",
  },
  disclaimerTitleRTL: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1e293b",
    textAlign: "right",
  },
  disclaimerText: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.5,
  },
  disclaimerTextRTL: {
    fontSize: 9,
    color: "#475569",
    lineHeight: 1.5,
    textAlign: "right",
  },
});

const UnitQuotationPDF = ({
  unit,
  locale,
  projectName,
}: UnitQuotationProps) => {
  const isRtl = locale === "ar";
  const date = moment().format("MMMM DD, YYYY h:mm a");

  const translations = {
    en: {
      quotation: "Quotation",
      generatedOn: "Generated on:",
      validity:
        "Quotation is valid for 24 hours from its date, subject to unit availability.",
      unitCode: "Unit Code:",
      project: "Project:",
      status: "Status:",
      price: "Price:",
      rooms: "Rooms:",
      area: "Area:",
      disclaimer: "Disclaimer",
      disclaimerText:
        "The unit reservation amount must be transferred to the company account specified in the document, and the reservation receipt must be sent to the sales specialist, the bond received, and signed to confirm the unit reservation.\n\nIn the case of an exemption, no tax is imposed on the first residence up to an amount of one million riyals. In the absence of an exemption, a tax of 5% is imposed on the property value.\n\nAccount Number: SA8205000068202945964001",
      available: "Available",
      sold: "Sold",
      reserved: "Reserved",
      sar: "SAR",
    },
    ar: {
      quotation: "عرض سعر",
      generatedOn: "تم الإنشاء في:",
      validity: "هذا العرض صالح لمدة 24 ساعة من تاريخه، ويخضع لتوفر الوحدات.",
      unitCode: "رمز الوحدة:",
      project: "المشروع:",
      status: "الحالة:",
      price: "السعر:",
      rooms: "الغرف:",
      area: "المساحة:",
      disclaimer: "إخلاء مسؤولية",
      disclaimerText:
        "يجب تحويل مبلغ حجز الوحدة إلى حساب الشركة المحدد في المستند، ويجب إرسال إيصال الحجز إلى أخصائي المبيعات، واستلام السند الموقع لتأكيد حجز الوحدة.\n\nفي حالة الإعفاء، لا تفرض ضريبة على المسكن الأول حتى مبلغ مليون ريال. وفي حالة عدم الإعفاء، تفرض ضريبة قدرها 5% على قيمة العقار.\n\nرقم الحساب: SA8205000068202945964001",
      available: "متاح",
      sold: "مباع",
      reserved: "محجوز",
      sar: "ريال",
    },
  };

  const t =
    translations[locale as keyof typeof translations] || translations.en;

  const Row = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | null;
  }) => (
    <View style={isRtl ? styles.tableRowReverse : styles.tableRow}>
      <Text style={isRtl ? styles.tableCellLabelRTL : styles.tableCellLabel}>
        {label}
      </Text>
      <Text style={isRtl ? styles.tableCellValueRTL : styles.tableCellValue}>
        {value || "---"}
      </Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t.quotation}</Text>
          <Image src="/logo.svg" style={styles.logo} />
        </View>

        <View style={styles.metaInfo}>
          <Text style={isRtl ? styles.metaTextRTL : styles.metaText}>
            {t.generatedOn} {date}
          </Text>
          <Text style={isRtl ? styles.metaTextRTL : styles.metaText}>
            {t.validity}
          </Text>
        </View>

        <View style={styles.table}>
          <Row label={t.unitCode} value={unit.unit_number} />
          <Row label={t.project} value={projectName} />
          <Row
            label={t.status}
            value={t[unit.status as keyof typeof t] || unit.status}
          />
          <Row label={t.price} value={`${unit.price} ${t.sar}`} />
          <Row label={t.rooms} value={unit.rooms} />
          <Row
            label={t.area}
            value={`${unit.area} ${isRtl ? "متر مربع" : "sq M"}`}
          />
        </View>

        <View style={styles.disclaimerSection}>
          <Text
            style={isRtl ? styles.disclaimerTitleRTL : styles.disclaimerTitle}
          >
            {t.disclaimer}
          </Text>
          <Text
            style={isRtl ? styles.disclaimerTextRTL : styles.disclaimerText}
          >
            {t.disclaimerText}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default UnitQuotationPDF;
