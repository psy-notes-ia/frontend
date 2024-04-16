// import addDays from "date-fns/addDays"
// import addHours from "date-fns/addHours"
import { format, addHours, addDays, nextSaturday } from "date-fns";
// import nextSaturday from "date-fns/nextSaturday"
import {
  Trash2,
  Edit,
} from "lucide-react";

import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";
import { Switch } from "@/registry/new-york/ui/switch";
import { Textarea } from "@/registry/new-york/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";
import { Mail } from "@/app/data";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
// import { Mail } from "@/app/(app)/examples/mail/data"

interface MailDisplayProps {
  mail: Mail | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const today = new Date();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        {mail != null && (
          <div className="flex ml-auto items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Excluir</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Excluir</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
      {/* <Separator /> */}

      <div className="flex flex-1 flex-col">
        {/* <Separator /> */}
        <ScrollArea className="h-screen">
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm mb-12">
            {mail?.text}
            {mail?.text}
            {mail?.text}
            {mail?.text}
            {mail?.text}
            {mail?.text}
            {mail?.text}
            {mail?.text}
            {mail?.text}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
