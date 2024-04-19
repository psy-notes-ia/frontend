// import addDays from "date-fns/addDays"
// import addHours from "date-fns/addHours"
"use client";
import { format, addHours, addDays, nextSaturday } from "date-fns";
// import nextSaturday from "date-fns/nextSaturday"
import { Trash2, Edit } from "lucide-react";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";
import { Switch } from "@/registry/new-york/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";
import { Mail } from "@/utils/data";
import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { useState } from "react";
import NewNoteDrawer from "./new-note";
// import { Mail } from "@/app/(app)/examples/mail/data"

interface NewNoteProps {
  onCancel: () => void;
  onSubmited: () => void;
}

export function NewNoteDisplay({ onCancel, onSubmited }: NewNoteProps) {
  const today = new Date();
  const [note, setNote] = useState("");

  const clearNote = () => setNote("");

  const onFinishNote = ()=>{
    clearNote();
    onSubmited();
    onCancel();
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <p className="text-foreground-400 text-sm">
          {2000 - note.length} caracteres
        </p>
        <div className="flex ml-auto items-center gap-2 mr-2">
          <Button variant="ghost" onClick={onFinishNote}>
            Cancelar
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />

          <NewNoteDrawer note={note} onSubmited={onFinishNote}>
            <Button>
              {/* <Edit className="h-4 w-4" /> */}
              Adicionar
            </Button>
          </NewNoteDrawer>
        </div>
      </div>
      {/* <Separator /> */}

      <div className="flex flex-1 flex-col">
        {/* <Separator /> */}
        <ScrollArea className="h-screen">
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm mb-12">
            <Textarea
              id="note"
              placeholder="Digite aqui sua anotação."
              className="w-full h-screen border-none"
              // disabled={note.length >= 2000}
              maxLength={2000}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
