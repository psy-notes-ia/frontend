import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import NoteService from "@/app/api/repository/NoteService";
import ConfirmActionDialog from "./Modals/ConfirmModal";
import DNALoader from "./DNALoader";
import Security from "@/utils/security";
const security = new Security();
// import { Mail } from "@/app/(app)/examples/mail/data"

interface MailDisplayProps {
  analyse: any | null;
}

export function AnalyseDisplay({ analyse }: MailDisplayProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        {analyse && (
          <h1 className="font-bold mb-0 text-xl capitalize">{analyse.title}</h1>
        )}
      </div>
      {/* <Separator /> */}

      <div className="flex flex-1 flex-col">
        {/* <Separator /> */}
        <ScrollArea className="h-screen">
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm mb-12">
            {analyse && analyse.analysed && (
              <div>
                <p>{security.decrypt(analyse.result)}</p>

                <h3 className="mt-2 font-semibold">
                  {analyse.attetionPoints!= undefined && (analyse.attetionPoints as []).length != 0 &&
                    "Pontos de atenção"}
                </h3>
                <ul>
                  {analyse.attetionPoints!= undefined &&(analyse.attetionPoints as []).map((e, i) => {
                    return <li key={i}>- {e}</li>;
                  })}
                </ul>

                <div className="w-full p-4 mt-4 rounded-xl flex flex-col justify-center items-center bg-[#7928CA]">
                  <h1 className="font-semibold text-2xl mb-4 text-white/70">
                    Palavras chave
                  </h1>

                  <div className="flex  flex-wrap gap-2 justify-center">
                    {(analyse.keywords as []).map((e) => (
                      <div className=" border rounded-full p-1 px-2 text-center bg-white text-[#7928CA]">
                        #{e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}{" "}
            {analyse && !analyse.analysed && (
              <div className="flex flex-col justify-center items-center">
                <DNALoader />
                <span className="text-foreground-400 text-xl">
                  Analisando...
                </span>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
