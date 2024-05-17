import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/new-york/ui/badge";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { Separator } from "@/registry/new-york/ui/separator";
import { Mail } from "@/utils/data";
import { useMail } from "@/utils/use-mail";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DecryptData } from "@/utils/crypto";
import Image from "next/image";
import { noteIcon } from "@/assets";
// import { Mail } from "@/app/(app)/examples/mail/data"
// import { useMail } from "@/app/(app)/examples/mail/use-mail"
import Security from "@/utils/security";
const security = new Security();
interface MailListProps {
  items: any[];
}

export function NoteList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0  mb-32">
        {items.length == 0 ? (
          <div className="flex flex-col justify-center items-center">
            <Image src={noteIcon} alt="note" />
            <h4 className="font-bold">Nenhuma anotação</h4>
            <span className="text-foreground-400 font-light">
              Comece a criar suas anotações
            </span>
          </div>
        ) : (
          ""
        )}
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold capitalize flex items-center">
                    <span className="flex h-[6px] w-[6px] rounded-full bg-blue-600 mr-1" />
                    {item.title}
                  </div>
                  {/* {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )} */}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {/* {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })} */}
                  {format(item.session, "PPP", { locale: ptBR })}
                </div>
              </div>
              {/* <div className="text-xs font-medium flex items-center">
                {" "}
                <span className="flex h-1 w-1 rounded-full bg-blue-600 mr-1" />
                {format(item.session, "PPP", { locale: ptBR })}
              </div> */}
            </div>
            <div className="line-clamp-2 mb-1 text-xs text-muted-foreground">
              {security.decrypt(item.summary)}
            </div>
            {item.tags.length ? (
              <div className="flex items-center gap-2">
                {item.tags.map((label: any, i: number) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(i)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  i: number
): ComponentProps<typeof Badge>["variant"] {
  // if (["work"].includes(label.toLowerCase())) {
  // }

  // if (["personal"].includes(label.toLowerCase())) {
  // }

  // if (i % 2 == 0) {
  // return "outline";
  // }
  // return "default";
  return "secondary";
}
