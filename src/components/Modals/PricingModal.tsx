"use client";
import PaymentService from "@/app/api/repository/PaymentService";
import { BasicFetch } from "@/app/api/repository/fetch";
import { useTranslation } from "@/i18n/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Switch,
} from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function PricingModal({
  isOpen,
  onOpenChange,
  lng,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  lng: string;
}) {
  const { t } = useTranslation(lng, "modals");

  const { data: session } = useSession();
  const { data, isLoading } = useSWR(PaymentService.GetPlansURL(), BasicFetch);

  const [annualy, changeAnnualy] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);

  const goToPortal = async () => {
    // setLoad((prev) => !prev);
    const { data, status } = await PaymentService.goToStripeCustomerPortal();

    if (status == 201) location.replace(data.url);
  };

  return (
    <Modal
      isOpen={isOpen}
      placement={"center"}
      onOpenChange={onOpenChange}
      size="3xl"
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader>
              <h3 className="text-xl font-semibold text-center m-auto">
                {/* Ops! Limite alcançado! Hora de dar um upgrade no plano... ; ) */}
                {t("pricing-modal.title")}
                <br />
                {/* Aproveite um universo de possibilidades */}
                {t("pricing-modal.description")}
              </h3>
            </ModalHeader>
            <ModalBody>
              <section className="flex items-center justify-center">
                <div
                  className="p-2 sm:px-10 flex flex-col justify-center items-center text-base mx-auto"
                  id="pricing"
                >
                  <div className="flex">
                    <span className={`mr-2 ${annualy ? "opacity-30" : ""}`}>
                      {t("pricing-modal.option.monthly")}
                    </span>
                    <Switch
                      defaultSelected
                      onValueChange={changeAnnualy}
                      aria-label="Annually"
                    />
                    <span className={!annualy ? "opacity-30" : ""}>
                      {t("pricing-modal.option.semester")}
                    </span>
                  </div>
                  <div className="space-y-5 px-4 py-4">
                    <div className="demo-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                      {data &&
                        (data.products as []).map((p: any) => {
                          var price = getPrice(
                            p.id,
                            annualy ? 6 : 1,
                            data.prices,
                            p.metadata.discount
                          );
                          if (p.name != "FREE")
                            return (
                              <PricingCard
                                t={t}
                                currentPlan={
                                  session?.user?.plan?.toLocaleLowerCase() ==
                                  p.name.toLocaleLowerCase()
                                }
                                features={p.features}
                                isSemesterly={annualy}
                                price={price.raw.montlhy}
                                total={price.raw.value}
                                symbolPrice={price.raw.symbol}
                                title={p.name}
                                onSumit={goToPortal}
                              />
                            );
                        })}
                    </div>
                  </div>

                  <Link href={"https://wa.me/11913598856"} target="_blank">
                    <Button
                      className="mt-4 mb-2"
                      color="default"
                      variant="bordered"
                      endContent={<ArrowRight size={16} className="ml-2" />}
                    >
                      {t("pricing-modal.link")}
                    </Button>
                  </Link>
                </div>
              </section>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const PricingCard = ({
  title,
  price,
  symbolPrice,
  currentPlan = false,
  isSemesterly,
  onSumit,
  total,
  features,
  t,
}: {
  title: string;
  t: any;
  symbolPrice: string;
  price: string;
  total: string;
  isSemesterly: boolean;
  currentPlan?: boolean;
  onSumit: () => void;
  features: { name: string }[];
}) => (
  <div className="rounded-[30px] md:rounded-[36px] bg-[#FAFAFA] overflow-hidden border-[1px] border-gray-200 p-8 relative">
    <div className="h-full">
      <div className="h-full z-10 relative">
        <div className="flex flex-col flex-1 justify-between h-full space-y-5">
          <div className="flex justify-between flex-col">
            <div className="text-xl md:text-2xl font-bold text-gray-900 flex justify-between">
              <span>{title}</span>
            </div>
            <div className="pt-5 text-gray-500 font-medium text-base space-y-1">
              <div className="flex items-center align-bottom">
                <span className="pt-1.5">{symbolPrice}</span>
                <div className="ml-1 mr-2 text-2xl md:text-3xl font-bold text-gray-900">
                  <span>{price.trim().split("\\s+")[0]}</span>
                </div>
                <span className="pt-1.5 text-xs">
                {t("pricing-modal.by-month")}{isSemesterly ? "*" : ""}
                </span>
              </div>
              <div className="text-sm">
                {isSemesterly ? symbolPrice + " " + total : ""}{" "}
                {isSemesterly ? " " + t("pricing-modal.semester") : ""}
              </div>
              <div className="text-sm"></div>
            </div>
            <div className="">
              <ul className="space-y-2 pt-8">
                {features.map((f, i) => {
                  return (
                    <li
                      key={i}
                      className="flex items-center text-sm font-medium space-x-2 text-black"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span>{f.name}</span>
                    </li>
                  );
                })}
                {/* <li className="flex items-center font-medium space-x-2 text-black">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span>5,000 events / month</span>
                </li>
                <li className="flex items-center font-medium space-x-2 text-black">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4444 3.03947C15.1056 2.37412 13.5965 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.6244 21.9793 11.2537 21.939 10.8889M9 11L12 14L22 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                  <span>Unlimited seats</span>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="pt-2">
            {currentPlan ? (
              <span className="font-semibold ">
                +{t("pricing-modal.current-plan")}
              </span>
            ) : (
              <button
                type="button"
                onClick={onSumit}
                className="appearance-none inline-flex hover:shadow-2xl transition-all duration-300 hover:scale-105 items-center group space-x-2.5 bg-black text-white py-4 px-5 rounded-2xl cursor-pointer"
              >
                <span className="w-full font-semibold text-base">
                  {t("pricing-modal.choose")} {title}
                </span>
                <svg
                  className="inline-block h-6"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12.4999H21L14 19.4999M14 5.5L18 9.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

function getPrice(
  pid: string,
  recurring: 1 | 6,
  data: any[],
  discountRecurring: string = ""
) {
  var prices = data.filter((e) => e.product == pid);
  var priceObj = prices.filter(
    (p) => p.recurring.interval_count == recurring
  )[0];
  let price = priceObj.unit_amount / 100;
  let recurPrice =
    (price / recurring) *
    (recurring == 1 ? 1 : 1 - parseFloat(discountRecurring));

  let format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return {
    id: priceObj.id,
    value: format.format(price),
    raw: {
      symbol: format.format(price).split(" ")[0],
      value: format.format(price).split(" ")[1],
      montlhy: format.format(recurPrice).split(" ")[1],
    },
    monthly: format.format(recurPrice),
  };
}
