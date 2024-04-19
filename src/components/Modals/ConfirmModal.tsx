import { useTranslation } from "@/app/i18n/client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const ConfirmActionModal = ({
  onSubmit,
  isOpen,
  onOpenChange,
  lng,
}: {
  onSubmit: (onClose: any) => void;
  isOpen: boolean;
  onOpenChange: () => void;
  lng: string;
}) => {
  const { t } = useTranslation(lng, "modals");

  return (
    <Modal
      isOpen={isOpen}
      placement={"bottom"}
      onOpenChange={onOpenChange}
      hideCloseButton
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader>
              <h3 className="text-xl font-semibold">
                {t("confirm-modal.title")}
              </h3>
            </ModalHeader>
            <ModalBody>
              <span className="text-sm">{t("confirm-modal.description")}</span>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onPress={onClose}>
                {t("confirm-modal.cancel-button")}
              </Button>
              <Button
                color="primary"
                type="submit"
                onClick={() => onSubmit(onClose)}
              >
                {t("confirm-modal.confirm-button")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmActionModal;
