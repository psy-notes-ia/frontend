// import addDays from "date-fns/addDays"
// import addHours from "date-fns/addHours"
import { format, addHours, addDays, nextSaturday } from "date-fns";
// import nextSaturday from "date-fns/nextSaturday"
import { Trash2, Edit } from "lucide-react";

import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";
import { Switch } from "@/registry/new-york/ui/switch";
import { Textarea } from "@/registry/new-york/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";
import { Mail } from "@/utils/data";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import NoteService from "@/app/api/repository/NoteService";
import ConfirmActionDialog from "./Modals/ConfirmModal";
import { DecryptData } from "@/utils/crypto";
// import { Mail } from "@/app/(app)/examples/mail/data"

interface MailDisplayProps {
  note: any | null;
  onNoteDeleted: () => void;
  deleteButton: boolean;
}

export function NoteDisplay({
  note,
  onNoteDeleted,
  deleteButton,
}: MailDisplayProps) {
  const deleteNote = async () => {
    await NoteService.deleteNote(note.id);
    onNoteDeleted();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        {note && (
          <h1 className="font-bold mb-0 text-xl capitalize">{note.title}</h1>
        )}
        {note && deleteButton && (
          <div className="flex ml-auto items-center gap-2">
            <Tooltip>
              <ConfirmActionDialog
                description={`Anotação "${note.title}" será deletada!`}
                onSubmit={(res) => (res ? deleteNote() : null)}
              >
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </TooltipTrigger>
              </ConfirmActionDialog>

              <TooltipContent>Excluir</TooltipContent>
            </Tooltip>
            {/* <Separator orientation="vertical" className="mx-1 h-6" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Editar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Editar</TooltipContent>
            </Tooltip> */}
          </div>
        )}
      </div>
      {/* <Separator /> */}

      <div className="flex flex-1 flex-col">
        {/* <Separator /> */}
        <ScrollArea className="h-screen">
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm mb-12">
            {note && (
              <>
                <p>{DecryptData(note.note)}</p>
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}