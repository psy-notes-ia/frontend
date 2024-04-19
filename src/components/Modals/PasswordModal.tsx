"use client";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@nextui-org/button";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

const PasswordModal = ({
  onSubmit,
  isOpen,
  onOpenChange,
  lng,
}: {
  onSubmit: (pass: string, onClose: any) => void;
  isOpen: boolean;
  onOpenChange: () => void;
  lng: string;
}) => {
  const { t } = useTranslation(lng, "modals");
  const [pass, setPass] = useState<string>("");

  return (
    <Modal
      isOpen={isOpen}
      placement={"bottom"}
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader>
              <h3 className="text-xl font-semibold">{t("password-modal.title")}</h3>
            </ModalHeader>
            <ModalBody>
              <Input
                type="password"
                label= {t("password-modal.input.label")}
                radius="sm"
                placeholder= {t("password-modal.input.placeholder")}
                size="lg"
                fullWidth
                labelPlacement="outside"
                onChange={(el) => setPass(el.target.value)}
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                onClick={() => onSubmit(pass, onClose)}
              >
                 {t("password-modal.button")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PasswordModal;
