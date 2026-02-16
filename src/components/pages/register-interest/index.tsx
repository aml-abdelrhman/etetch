
import RegisterInterestForm from "./register-interest-form";
import { useTranslations } from "next-intl";

const RegisterInterest = () => {
    const t =useTranslations()
  return (
    <section className="bg-main-50 min-h-screen">
      <div className="bg-main-200 py-[20svh] relative">
        <img
          src="/section-bg-dark-caramel.svg"
          alt="Section Background"
          className="absolute top-0 start-0 z-5 pointer-events-none"
        />
        <div className="container flex flex-col items-center text-center gap-5">
          <img
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none w-16"
          />
          <h1 className="section-title">{t("Register your interest")}</h1>
          <p className="text-cyan-950/60 max-w-2xl mx-auto">
            {t(
              "Register your interest in our upcoming projects and be the first to know when they launch",
            )}
          </p>
        </div>
      </div>

      <div className="container py-20">
        <RegisterInterestForm />
      </div>
    </section>
  );
};

export default RegisterInterest;
