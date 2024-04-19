"use client";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AuthenticationService from "@/app/api/repository/AuthenticationService";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { useTranslation } from "@/i18n/client";

export default function ResetPasswordForm({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const { t } = useTranslation(lang, "credentials");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, isSubmitted },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();
  const udpateLoading = () => setLoading((prev) => !prev);

  const onSubmit = async (data: any) => {
    udpateLoading();
    const { email } = data;

    if (email) {
      await AuthenticationService.SendForgotPasswordEmail(email);
      setSent((prev) => !prev);
    }
    udpateLoading();
  };

  return (
    <section className="dark bg-black h-screen">
      {sent ? (
        <div className="max-w-4xl my-auto mx-auto px-4 sm:px-6 flex flex-col justify-center text-center items-center h-screen">
          <div className="my-auto">
            <Mail size={200} className="text-foreground-500 m-auto mb-6" />
            <h1 className="text-foreground-500 mb-2 font-bol text-2xl">
              {t("forgot-email-sent.title")}
            </h1>
            <p className="text-xl text-foreground-300 mb-6">
              {t("forgot-email-sent.description")}
            </p>
            <Button
              onClick={() => router.push("/signin")}
              startContent={<ArrowLeft />}
              variant="flat"
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <br />

          <Button
            onClick={() => router.push("/signin")}
            startContent={<ArrowLeft />}
            variant="flat"
          >
            {t("forgot-password.back-button")}
          </Button>
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Page header */}
            <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
              <KeyRound size={100} className="text-white/50 m-auto mb-4" />
              <h1 className="text-foreground-500 mb-2 font-bol text-2xl">
                {t("forgot-password.title")}
              </h1>
              <p className="text-xl text-foreground-300">
                {t("forgot-password.description")}
              </p>
            </div>
            <div className="max-w-sm mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className=" dark flex flex-wrap -mx-3 mb-4">
                  <Input
                    radius="sm"
                    type="email"
                    label={t("forgot-password.input.label")}
                    placeholder={t("forgot-password.input.placeholder")}
                    size="lg"
                    labelPlacement="outside"
                    {...register("email", {
                      // required: t("forgot-password.input.error"),
                      // pattern:
                      //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                    })}
                    // isInvalid={!isValid && isSubmitted}
                    errorMessage={t("forgot-password.input.error")}
                    isRequired
                  />
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <Button
                      fullWidth
                      size="lg"
                      color="primary"
                      type="submit"
                      isLoading={loading}
                    >
                      {t("forgot-password.button")}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
