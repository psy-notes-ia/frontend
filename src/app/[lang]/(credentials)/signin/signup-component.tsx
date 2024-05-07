"use client"

import { Check, Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";

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
  export default RegisterComponent;