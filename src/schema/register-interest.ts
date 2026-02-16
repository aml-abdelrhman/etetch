import { z } from "zod";

export const registerInterestSchema = z.object({
  full_name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  payment_method: z.enum(["cash", "supported_bank", "un_supported_bank"], {
    message: "Please select a payment method",
  }),
  budget: z.string().min(1, { message: "Budget is required" }),
  city_id: z.number({ message: "Please select a city" }),
  property_type: z.enum(
    ["apartment", "floors", "penthouse", "townhouse", "villa"],
    {
      message: "Please select a property type",
    },
  ),
  connection_method: z
    .array(z.enum(["whatsapp", "call"]))
    .min(1, { message: "Please select at least one connection method" }),
});

export type RegisterInterestValues = z.infer<typeof registerInterestSchema>;
