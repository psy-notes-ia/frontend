"use client"
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";

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
  
  export default SigninComponent;