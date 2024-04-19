"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Check, Eye, EyeOff, X } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import AuthenticationService from "@/app/api/repository/AuthenticationService";

import { useTranslation } from "@/i18n/client";
import { logo } from "@/assets";

export default function SignInForm({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const { t } = useTranslation(lang, "credentials");

  const [loading, setLoading] = useState(false);
  const [loadingG, setLoadingG] = useState(false);
  const [signup, setSignup] = useState(false);

  const r = useRouter();

  const onSubmit = async (data: any) => {
    udpateLoading();
    const { email, password } = data;

    const session = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (session?.ok) r.push("/");
    else if (session?.error) {
      udpateLoading();
      const error = JSON.parse(session.error).error;
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const onSubmitRegister = async (user: any) => {
    udpateLoading();

    const data = {
      ...user,
      provider: "credentials",
      country: "BRAZIL",
    };

    const res = await AuthenticationService.SignUp(data);

    if (res.status == 201) {
      const session = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (session?.ok) {
        r.push("/");
        udpateLoading();
      } else if (session?.error) {
        udpateLoading();
        const error = JSON.parse(session.error).error;
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error(t("signup.error"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const udpateLoadingG = () => setLoadingG((prev) => !prev);
  const udpateLoading = () => setLoading((prev) => !prev);

  const onGoogleSignIn = async () => {
    udpateLoadingG();
    const session = await signIn("google", {
      redirect: false,
    });
    udpateLoadingG();
    if (session?.ok) location.reload();
  };

  return (
    <section className="bg-[#121212] py-12 h-screen">
      <div
        className={
          "dark overflow-hidden shadow-md shadow-[#1c1c1c] relative bg-[#1c1c1c] max-w-xl mx-auto md:rounded-tl-[50px] md:rounded-br-[50px] h-full box-anim-clock"
        }
      >
        <div className=" h-auto z-10 inset-1 absolute md:rounded-tl-[50px] md:rounded-br-[50px] bg-[#1c1c1c] max-w-2xl mx-auto flex flex-col p-4 sm:px-6 justify-between">
          <div className="max-w-3xl mx-auto mt-8 flex flex-col justify-center items-center">
            <Image src={logo} alt="" className="w-3/4" />
            <h1 className="text-4xl font-extralight text-foreground-500 mt-8">
              {t("h1")}
            </h1>
          </div>
          <div className="">
            <div className="max-w-sm mx-auto">
              {signup ? (
                <RegisterComponent
                  loading={loading}
                  onSubmit={onSubmitRegister}
                  t={t}
                />
              ) : (
                <SigninComponent loading={loading} onSubmit={onSubmit} t={t} />
              )}
            </div>
          </div>
          {signup ? (
            <div className="text-foreground-400 text-center mt-4">
              <span>{t("signup.link.text")}</span>{" "}
              <Button
                size="sm"
                onClick={() => setSignup(false)}
                className="text-primary-500 font-medium hover:underline transition duration-150 ease-in-out"
              >
                {t("signup.link.button")}
              </Button>
            </div>
          ) : (
            <div className="text-foreground-400 text-center mt-6">
              <span>{t("signin.link.text")}</span>{" "}
              <Button
                size="sm"
                onClick={() => setSignup(true)}
                className="text-primary-500 font-medium hover:underline transition duration-150 ease-in-out"
              >
                {t("signin.link.button")}
              </Button>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </section>
  );
}

const SigninComponent = ({
  onSubmit,
  loading,
  t,
}: {
  onSubmit: any;
  loading: boolean;
  t: any;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <Input
            radius="sm"
            type="email"
            label={t("signin.labels.email")}
            placeholder={t("signin.placeholder.email")}
            size="lg"
            variant="flat"
            labelPlacement="outside"
            {...register("email")}
            errorMessage=""
            isRequired
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <Input
            type="password"
            label={t("signin.labels.pass")}
            radius="sm"
            placeholder={t("signin.placeholder.pass")}
            size="lg"
            labelPlacement="outside"
            {...register("password")}
            isRequired
            errorMessage=""
          />
          <Link
            href="/reset-password"
            className="text-sm font-medium text-primary-500  hover:underline mt-2 flex justify-end"
          >
            {t("signin.link.forgot")}
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mt-10">
        <div className="w-full px-3">
          <Button
            fullWidth
            size="lg"
            color="primary"
            type="submit"
            isLoading={loading}
          >
            {t("signin.submitButton")}
          </Button>
        </div>
      </div>
    </form>
  );
};

const RegisterComponent = ({
  onSubmit,
  loading,
  t,
}: {
  onSubmit: any;
  t: any;
  loading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const validateBeforeSubmit = (data: any) => {
    if (passwordValidateSubmit(data.password)) {
      onSubmit(data);
    }
  };

  const passwordValidation = (password: string) => {
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
    ];

    return requirements.map((e) => {
      return e;
    });
  };

  const passwordValidateSubmit = (password: string): boolean => {
    return [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
    ].every(Boolean);
  };

  return (
    <form onSubmit={handleSubmit(validateBeforeSubmit)} className="space-y-10">
      <Input
        radius="sm"
        type="text"
        label={t("signup.inputs.name.label")}
        placeholder={t("signup.inputs.name.placeholder")}
        className="mt-4"
        size="lg"
        labelPlacement="outside"
        {...register("name")}
        isRequired
      />
      <Input
        type="email"
        label={t("signup.inputs.email.label")}
        radius="sm"
        placeholder={t("signup.inputs.email.placeholder")}
        size="lg"
        labelPlacement="outside"
        {...register("email")}
        isRequired
      />
      <div>
        <Input
          type={passwordShown ? "text" : "password"}
          label={t("signup.inputs.password.label")}
          radius="sm"
          placeholder={t("signup.inputs.password.placeholder")}
          size="lg"
          endContent={
            passwordShown ? (
              <EyeOff onClick={togglePasswordVisiblity} />
            ) : (
              <Eye onClick={togglePasswordVisiblity} />
            )
          }
          labelPlacement="outside"
          errorMessage={errors.root?.message?.toString()}
          {...register("password")}
          isRequired
        />
        <div className="text-white/40 mt-3">
          {passwordValidation(watch("password") ?? "").map((e, i) => {
            return (
              <li key={i} className="flex items-center text-[10px]">
                <span className="mr-2">
                  {e.valid ? (
                    <Check size={12} color="#48BA7F" />
                  ) : (
                    <X size={12} />
                  )}{" "}
                </span>
                <p>{e.message}</p>
              </li>
            );
          })}
        </div>
      </div>

      <Button
        fullWidth
        size="lg"
        color="primary"
        type="submit"
        isLoading={loading}
      >
        {t("signup.button")}
      </Button>
    </form>
  );
};
