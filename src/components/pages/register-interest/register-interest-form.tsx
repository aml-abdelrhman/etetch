"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  registerInterestSchema,
  RegisterInterestValues,
} from "@/schema/register-interest";
import { citiesQueryOptions, useRegisterInterestMutation } from "@/queries";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const RegisterInterestForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  // const { data: cities } = useSuspenseQuery(citiesQueryOptions());
  const cities = [
    {
      id: 1,
      name: {
        ar: "القاهرة",
        en: "Cairo",
      },
    },
  ];
  const { mutateAsync: registerInterest, isPending } =
    useRegisterInterestMutation();

  const form = useForm<RegisterInterestValues>({
    resolver: zodResolver(registerInterestSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      payment_method: "cash",
      budget: "",
      city_id: undefined,
      property_type: "apartment",
      connection_method: ["whatsapp"],
    },
  });

  const onSubmit = async (values: RegisterInterestValues) => {
    try {
      await registerInterest(values);
      toast.success(t("register_interest.success_title"), {
        description: t("register_interest.success_description"),
      });
      form.reset();
    } catch (error: any) {
      toast.error(t("register_interest.error_title"), {
        description: error.message || t("register_interest.error_description"),
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-none bg-main-200 relative overflow-hidden z-10">
      <Image
        src="/section-bg-dark-caramel.svg"
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
                  <FormLabel>{t("register_interest.full_name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("register_interest.full_name")}
                      {...field}
                    />
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
                  <FormLabel>{t("register_interest.phone")}</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="SA" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("register_interest.city")}</FormLabel>
                  <Select
                    onValueChange={(val) => field.onChange(Number(val))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("register_interest.city")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities?.map((city) => (
                        <SelectItem key={city.id} value={city.id.toString()}>
                          {city.name[locale as keyof typeof city.name]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("register_interest.budget")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("register_interest.budget")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("register_interest.payment_method")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("register_interest.payment_method")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["cash", "supported_bank", "un_supported_bank"].map(
                        (method) => (
                          <SelectItem key={method} value={method}>
                            {t(`payment_methods.${method}`)}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="property_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("register_interest.property_type")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("register_interest.property_type")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "apartment",
                        "floors",
                        "penthouse",
                        "townhouse",
                        "villa",
                      ].map((type) => (
                        <SelectItem key={type} value={type}>
                          {t(`property_types.${type}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="connection_method"
              render={() => (
                <FormItem>
                  <FormLabel>
                    {t("register_interest.connection_method")}
                  </FormLabel>
                  <div className="flex gap-6 pt-2">
                    {["whatsapp", "call"].map((method) => (
                      <FormField
                        key={method}
                        control={form.control}
                        name="connection_method"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0 rtl:space-x-reverse">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method as any)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, method])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== method,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {t(`connection_methods.${method}`)}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
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
              {isPending ? t("Loading") : t("register_interest.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterInterestForm;
