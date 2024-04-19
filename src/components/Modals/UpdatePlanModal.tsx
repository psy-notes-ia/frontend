"use client";

import PaymentService from "@/app/api/repository/PaymentService";
import { analyse, chat, form_feedback, headphone, inteligence } from "@/assets";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const UpdatePlanModal = ({
  isOpen,
  onOpenChange,
  hitLimit = false
}: {
  isOpen: boolean;
  hitLimit?:boolean;
  onOpenChange: () => void;
}) => {
  const [current, setCurrent] = useState(0);
  const router = useRouter()
  const [load, setLoad] = useState<boolean>(false);

  const nextSlide = () => {
    if (current < pages.length - 1) setCurrent((prev) => ++prev);
  };

  const prevSlide = () => {
    if (current != 0) setCurrent((prev) => --prev);
  };

  const goToPortal = async () => {
    setLoad(prev=>!prev);
    const { data, status } = await PaymentService.goToStripeCustomerPortal();

    if (status == 201) location.assign(data.url);
    setLoad(prev=>!prev);
  };

  const pages = [
    {
      title: "Colete mais respostas",
      description:
        "Amplie seu alcance e aprofunde sua compreensão do público-alvo. Maximize a coleta de dados para insights mais robustos.",
      img: chat,
    },
    {
      title: "Tenha mais insights",
      description:
        "Desbloqueie camadas mais profundas de entendimento com análises avançadas. Transforme dados em inteligência acionável para impulsionar sua estratégia de negócios.",
      img: form_feedback,
    },
    {
      title: "IA mais precisa",
      description:
        "Potencialize seus resultados com uma inteligência artificial mais refinada. Aprimore a precisão das análises e tomadas de decisão para um desempenho ainda mais impactante",
      img: inteligence,
    },
    // {
    //   title: "Estrategias e estatiscas",
    //   description:
    //     "Deixe a inteligência artificial criar estratégias elaboradas e fornecer estatísticas detalhadas. Otimize sua abordagem com a orientação avançada da IA.",
    //   img: analyse,
    // },
    {
      title: "E claro, um suporte 24/7",
      description:
        "Conte com nosso suporte dedicado a qualquer hora do dia. Estamos aqui para garantir que você aproveite ao máximo a plataforma, sempre.",
      img: headphone,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      placement={"center"}
      onOpenChange={onOpenChange}
      className="light text-black"
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader>
              <h2 className="font-bold text-xl text-center">
                
                {hitLimit ? "Ops! Limite alcançado! Hora de dar um upgrade no plano... ; )": "Aproveite um universo de possibilidades"}
              </h2>
            </ModalHeader>
            <ModalBody>
              <div className="z-50 flex items-center justify-center">
                {current != 0 && (
                  <button
                    className="z-50 text-black/30 hover:text-black hover:scale-125 transition-all"
                    onClick={prevSlide}
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                {pages.map((feat, i) => {
                  if (i == current)
                    return (
                      <div
                        key={i}
                        className="flex flex-col justify-center items-center"
                      >
                          <h2 className="font-semibold text-xl mb-2">
                            {feat.title}
                          </h2>

                        <Image
                          src={feat.img}
                          alt={"feature " + i}
                          width={200}
                          height={200}
                        />
                        <span className="text-sm font-light text-justify">
                          {feat.description}
                        </span>
                      </div>
                    );
                })}
                <br />
                <br />
                {current != pages.length - 1 && (
                  <button
                    className="z-50 text-black/30 hover:text-black  hover:scale-125 transition-all"
                    onClick={nextSlide}
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
              <div className="flex space-x-2 m-auto transition-colors">
                {pages.map((f, i) => {
                  return (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i == current ? "bg-black" : "bg-black/20"
                      }`}
                    ></div>
                  );
                })}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
              isLoading={load}
                fullWidth
                color="primary"
                type="submit"
                onClick={goToPortal}
              >
                Atualizar agora
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UpdatePlanModal;
