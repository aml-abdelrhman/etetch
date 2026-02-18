"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { employmentSchema, EmploymentValues } from "@/schema/employment";
import { useEmploymentMutation } from "@/queries";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DocumentFileUpload from "@/components/DocumentFileUpload";
import { PhoneInput } from "@/components/ui/phone-input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const EmploymentForm = () => {
  const t = useTranslations();
  const { mutateAsync: submitEmployment, isPending } = useEmploymentMutation();

  const form = useForm<EmploymentValues>({
    resolver: zodResolver(employmentSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      experience: "beginner",
      cv: undefined,
    },
  });

  const onSubmit = async (values: EmploymentValues) => {
    try {
      await submitEmployment(values);
      toast.success(t("employment.success_title"), {
        description: t("employment.success_description"),
      });
      form.reset();
    } catch (error: any) {
      toast.error(t("employment.error_title"), {
        description: error.message || t("employment.error_description"),
      });
    }
  };

  return (
    <Card className="max-w-xl mx-auto bg-main-50 relative overflow-hidden z-10">
      <Image
        src="/section-bg-caramel.svg"
        alt="section-bg-caramel"
        className="absolute bottom-0 end-0 z-3 w-full h-full rotate-90 pointer-events-none"
        width={799}
        height={387}
      />
      <CardContent className="p-8 z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employment.full_name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("employment.full_name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employment.phone")}</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="SA" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t("employment.experience")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {["beginner", "intermidate", "expert"].map((level) => (
                        <FormItem
                          key={level}
                          className="flex items-center space-x-3 space-y-0 rtl:space-x-reverse"
                        >
                          <FormControl>
                            <RadioGroupItem value={level} />
                          </FormControl>
                          <Label className="font-normal cursor-pointer">
                            {t(`experience_levels.${level}`)}
                          </Label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("employment.cv")}</FormLabel>
                  <FormControl>
                    <DocumentFileUpload
                      onFileChange={field.onChange}
                      accept=".pdf,.doc,.docx"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              isLoading={isPending}
              size="lg"
              className="w-full"
            >
              {isPending ? t("Loading") : t("employment.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmploymentForm;
