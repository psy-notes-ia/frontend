"use client";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Snippet,
} from "@nextui-org/react";

import { toPng } from "html-to-image";
import { Download } from "lucide-react";

import { useQRCode } from "next-qrcode";
import { useRef } from "react";

const ShareFormModal = ({
  isOpen,
  code,
  onOpenChange,
  lng,
}: {
  isOpen: boolean;
  code: string;
  onOpenChange: () => void;
  lng: string;
}) => {
  const { t } = useTranslation(lng, "modals");
  let elementRef = useRef(null);

  const url = process.env.NEXT_PUBLIC_FORM_URL + code;
  const DonwloadQr = () => htmlToImageConvert();

  const { SVG } = useQRCode();

  const htmlToImageConvert = () => {
    toPng(elementRef.current!, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "smartformx-qrcode.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal isOpen={isOpen} placement={"bottom"} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalBody className="mt-6">
              <div className="flex justify-center" ref={elementRef}>
                <SVG
                  text={url}
                  options={{
                    width: 250,
                    margin: 1,

                    // color: {
                    //   dark: "#010599FF",
                    //   light: "#FFBF60FF",
                    // },
                  }}
                />
              </div>
              <Snippet
                tooltipProps={{
                  color: "foreground",
                  content: "Copie o link",
                  disableAnimation: true,
                  placement: "right",
                  closeDelay: 0,
                }}
                className="m-auto w-fit"
                codeString={url}
              >
                {t("share-modal.snippet")}
              </Snippet>
              <span className="mb-4 text-center">
                {/* Use o qr-code ou copie e envie o link! ;) */}
                {t("share-modal.span")}
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                startContent={<Download />}
                fullWidth
                // onPress={() => onSubmit(onClose)}
                onClick={DonwloadQr}
              >
                {t("share-modal.button")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShareFormModal;
