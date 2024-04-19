"use client";

import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

import useSWR from "swr";

// import { sfx_logo } from "@/assets";
import { useRouter, useSearchParams } from "next/navigation";

import AuthenticationService from "@/app/api/repository/AuthenticationService";
import {
  Check,
  Lock,
  MessageCircleWarning,
  ShieldCheck,
  X,
} from "lucide-react";
import { useTranslation } from "@/i18n/client";

export const dynamic = "force-dynamic";

const fetcher = (arg: any, ...args: any) =>
  fetch(arg, ...args).then((res) => res.json());

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
    watch,
    getValues,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange" });

  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const udpateLoading = () => setLoading((prev) => !prev);

  const token = searchParams.get("wtk")!;
  const uid = searchParams.get("uid")!;

  const { data, isLoading, error } = useSWR(
    AuthenticationService.GetCheckResetPasswordTokenURL(uid, token),
    fetcher
  );
  const validateBeforeSubmit = (data: any) => {
    if (passwordValidateSubmit(data.password)) {
      onSubmit(data);
    }
  };
  const passwordValidateSubmit = (password: string): boolean => {
    return [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
    ].every(Boolean);
  };

  const passwordValidation = (password: string, pass2: string) => {
    const requirements = [
      // Must be at least 8 characters
      {
        message: t("signup.inputs.password.requirements.min"),
        valid: password.length >= 8,
      },
      {
        message: t("signup.inputs.password.requirements.upper"),
        valid: /[A-Z]/.test(password),
      },
      {
        message: t("signup.inputs.password.requirements.lower"),
        valid: /[a-z]/.test(password),
      },
      {
        message: t("signup.inputs.password.requirements.number"),
        valid: /\d/.test(password),
      },
      {
        message: t("signup.inputs.password.requirements.equals"),
        valid: password == pass2 && password != "",
      },
    ];

    return requirements.map((e) => {
      return e;
    });
  };

  const onSubmit = async (data: any) => {
    const { pass } = data;

    udpateLoading();
    await AuthenticationService.ResetPassword(pass, uid);
    udpateLoading();

    setSuccess((prev) => !prev);
    setTimeout(() => {
      router.push("/signin");
    }, 1500);
  };

  if (error || (data && !data.valid))
    return (
      <div className=" bg-[#121212] dark flex justify-center items-center flex-col h-screen">
        <MessageCircleWarning size={200} className="text-foreground-400" />
        <h1 className="text-white text-5xl mt-4">{t("new-password.invalid")}</h1>
      </div>
    );

  if (isLoading)
    return (
      <div className="bg-[#121212] text-black">
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 text-foreground-400"></div>
        </div>
      </div>
    );
  if (data && data.valid)
    return (
      <section className="dark bg-[#121212]">
        {success ? (
          <div className="w-full h-screen flex flex-col justify-center items-center text-green-500">
            <ShieldCheck size={200} />
            <h1 className="text-5xl mt-6">{t("new-password.success")}</h1>
            <div className="text-black">
              <div className="fixed bottom-8 right-0 w-screen z-50 flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-white/30"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-screen">
            <br />

            <div className="pt-10 ">
              <div className="max-w-sm mx-auto border border-white/20 bg-[#1c1c1c] rounded-xl p-8">
                <div className="max-w-4xl mx-auto text-center pb-3 md:pb-4">
                  {/* <Image
                    src={sfx_logo}
                    alt="SMARTFORMX"
                    width={200}
                    className="m-auto mb-4"
                  /> */}
                  <h1 className="font-bold text-3xl mb-2 text-white/90">
                  {t("new-password.title")}
                  </h1>
                </div>
                <form onSubmit={handleSubmit(validateBeforeSubmit)}>
                  <div className="flex flex-wrap mb-4 mt-4">
                    <Input
                      radius="sm"
                      type="password"
                      className="mb-4"
                      label={t("new-password.inputs.pass.label")}
                      placeholder="***********"
                      size="lg"
                      labelPlacement="outside"
                      {...register("pass", {
                        minLength: 8,
                      })}
                      isRequired
                    />
                    <Input
                      radius="sm"
                      type="password"
                      label={t("new-password.inputs.confirm-pass.label")}
                      placeholder="***********"
                      size="lg"
                      labelPlacement="outside"
                      {...register("cpass", {})}
                      isRequired
                    />
                    <ul className="mt-2">
                      {passwordValidation(
                        watch("pass") ?? "",
                        watch("cpass") ?? ""
                      ).map((e, i) => {
                        return (
                          <li
                            key={i}
                            className="flex items-center text-[10px] text-white/30"
                          >
                            <span className="mr-2">
                              {e.valid ? (
                                <Check size={12} color="#48BA7F" />
                              ) : (
                                <X size={12} color="red" />
                              )}{" "}
                            </span>
                            <p>{e.message}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex flex-wrap mt-8">
                    <Button
                      fullWidth
                      size="lg"
                      radius="sm"
                      color="primary"
                      type="submit"
                      startContent={<Lock />}
                      isLoading={loading}
                    >
                      {t("new-password.button")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    );
}
