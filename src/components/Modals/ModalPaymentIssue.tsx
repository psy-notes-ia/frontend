"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
// import PaymentService from "@/app/api/repository/PaymentService";
import { useSession } from "next-auth/react";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "@/i18n/client";

export default function ModalPaymentIssue({
  isOpen,
  onChange,
  lng,
}: {
  isOpen: boolean;
  onChange: () => void;
  lng: string;
}) {
  const { data } = useSession();
  const { t } = useTranslation(lng, "modals");

  const goToPortal = async () => {
    const user = data?.user;
    if (user) {
      // const { data, status } = await PaymentService.goToStripeCustomerPortal();
      // window.location.assign(data.url);
    }
  };
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onChange}
      radius="lg"
      isDismissable={false}
      hideCloseButton
      classNames={{
        body: "py-6",
        // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        // header: "border-b-[1px] border-[#292f46]",
        // footer: "border-t-[1px] border-[#292f46]",
        // closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t("payment-issue-modal.title")}
            </ModalHeader>
            <ModalBody className="flex flex-col justify-center items-center text-justify">
              <div className="bg-[#ED1313] bg-opacity-10 w-fit rounded-full p-2">
                <AlertCircle color={"#ED1313"} size={100} />
              </div>
              <p className="text-sm mt-2">
                {t("payment-issue-modal.description")}
              </p>
              <p className="text-center text-sm mt-2">
                {t("payment-issue-modal.p")}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={goToPortal} fullWidth>
              {t("payment-issue-modal.button")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
