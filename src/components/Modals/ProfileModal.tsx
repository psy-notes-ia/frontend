"use client";

import businessService from "@/app/api/repository/BussinessService";
import PaymentService from "@/app/api/repository/PaymentService";
import { AppFetchJSON } from "@/app/api/repository/fetch";
import { useTranslation } from "@/app/i18n/client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";


export default function ProfileModal({
  isOpen,
  onOpenChange,
  lng
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  lng: string;
}) {
  const session = useSession();

  const {t} = useTranslation(lng, "modals");
  // const { data, isLoading, error } = useSWR(
  //   businessService.getBusinessURL(),
  //   AppFetchJSON
  // );
  const goToPortal = async () => {
    // const uid = session.data?.user?.id;
    // if (uid) {
      const { data, status } = await PaymentService.goToStripeCustomerPortal(
        
      );
      if (status == 201) location.assign(data.url);
  };


  // if (isLoading)
  //   return (
  //     <Modal
  //       isOpen={isOpen}
  //       onOpenChange={onOpenChange}
  //       placement="bottom-center"
  //       isDismissable={false}
  //       className="animate-pulse flex space-x-4"
  //       classNames={{
  //         closeButton: "text-white"
  //       }}
  //     >
  //       <ModalHeader className="p-2 h-52" >
  //         <div className="bg-blue-500 w-full h-28 rounded-md" />
  //         <div className="flex flex-col justify-center items-center text-center absolute top-16 left-0 right-0">
  //           <div className="bg-slate-700 flex uppercase items-center justify-center rounded-2xl border-8 border-[#18181B] w-[100px] h-[100px]">
  //             {/* {placeName.split(" ").map((e) => e[0])} */}
  //           </div>
  //           <h2 className="text-xl font-bold mt-2 bg-slate-700 h-10 w-10"></h2>
  //         </div>
  //       </ModalHeader>
        {/* <ModalBody className="mb-6">
          <div className="bg-slate-700 h-52 w-full rounded-lg mt-4"></div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold">Nome do negócio</h4>
              <p className="bg-slate-700 h-10 w-8"></p>
            </div>
            <div>
              <h4 className="font-bold ">Categoria</h4>
              <p className="bg-slate-700 h-10 w-8"></p>
            </div>
            <div>
              <h4 className="font-bold">Clientes</h4>
              <p className="bg-slate-700 h-10 w-8"></p>
            </div>
          </div>
          <div>
            <h4 className="font-bold">Descrição</h4>
            <p className="bg-slate-700 h-14 w-10"></p>
          </div>
        </ModalBody> */}

    //   </Modal>
    // );
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom-center"
      isDismissable={false}
      size="lg"
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="p-2 h-52">
              <div className="bg-blue-500 w-full h-28 rounded-md" />
              <div className="flex flex-col justify-center items-center text-center absolute top-[70px] left-0 right-0">
                <div className="flex uppercase items-center justify-center bg-white text-black font-bold text-4xl rounded-2xl border-4 border-[#18181B] px-4 w-[90px]  h-[90px]">
                  {session.data?.user?.name?.split(" ").map((e: any) => e[0])}
                </div>
                <h2 className="text-xl font-bold mt-2">{session.data?.user?.name}</h2>
                <span className="text-base font-normal text-foreground-400">{session.data?.user?.email}</span>
              </div>
            </ModalHeader>
            <ModalBody>
              <CardPlan
                description={session.data?.user?.subscribeStatus!}
                name={session.data?.user?.plan ?? ""}
                buttonText={ t("profile-modal.button")}
                // description={""}
                // name={""}
                onChangeSubmit={goToPortal}
              />
              {/* <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold">Nome do negócio</h4>
                  <p>{data.name}</p>
                </div>
                <div>
                  <h4 className="font-bold">Categoria</h4>
                  <p>{data.category}</p>
                </div>
                <div>
                  <h4 className="font-bold">Clientes</h4>
                  <p>˜{data.clients}</p>
                </div>
              </div>
              <div>
                <h4 className="font-bold">Descrição</h4>
                <p>{data.description}</p>
              </div> */}
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

const CardPlan = ({
  name,
  description,
  onChangeSubmit,
  buttonText
}: {
  buttonText: string;
  name: string;
  description: string;
  onChangeSubmit: () => void;
}) => {
  return (
    <div className="flex flex-col justify-between p-1 bg-gradient-to-r from-[#9400D3] to-[#4B0082] rounded-lg mt-5">
      <div className="flex flex-col bg-[#fff] justify-between h-full w-full p-4 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold text-xl uppercase text-black">{name}</h1>
            <div className="flex opacity-50">
              {/* <FiCheck /> */}
              <span className="text-sm text-foreground-500 font-medium">
                {getStatusPlanName(description)}
              </span>
            </div>
          </div>
          <Button
            // className="bg-white text-[#18181B] font-medium"
            radius="sm"
            variant="flat"
            onClick={onChangeSubmit}
            size="sm"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

function formatDate(isoDateTime: string) {
  const dateTime = new Date(isoDateTime);

  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Note: Months are zero-based
  const year = dateTime.getFullYear();

  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}

function getStatusPlanName(name: string) {
  switch (name) {
    case "trialing":
      return "Período de avaliação";
    case "active":
      return "Ativo";


    default:
      return "Pausado";
  }
}
