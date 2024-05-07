"use client";

import { ToastContainer, toast } from "react-toastify";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslation } from "@/i18n/client";
import { logo } from "@/assets";

import RegisterComponent from "./signup-component";
import SigninComponent from "./signin-component";
import AuthenticationService from "@/app/api/repository/AuthenticationService";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.min.css";

export default function SignInForm({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const { t } = useTranslation(lang, "credentials");
  
  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(false);
  
  const onSubmit = async (data: any) => {
    udpateLoading();
    const { email, password } = data;
    
    const session = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    
    if (session?.ok) location.replace("/");
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
        location.replace("/");
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

  const udpateLoading = () => setLoading((prev) => !prev);

  // const onGoogleSignIn = async () => {
  //   udpateLoadingG();
  //   const session = await signIn("google", {
  //     redirect: false,
  //   });
  //   udpateLoadingG();
  //   if (session?.ok) location.reload();
  // };

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
