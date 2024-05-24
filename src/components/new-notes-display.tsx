"use client";
import { Textarea } from "@/registry/new-york/ui/textarea";
import { Button } from "@/registry/new-york/ui/button";
import { Separator } from "@/registry/new-york/ui/separator";

import { ScrollArea } from "@/registry/new-york/ui/scroll-area";
import { useEffect, useState } from "react";
import NewNoteDrawer from "./new-note";
import { useMail } from "@/utils/use-mail";
import Security from "@/utils/security";
import NoteService from "@/app/api/repository/NoteService";

const security = new Security();
interface NewNoteProps {
  onCancel: () => void;
  onSubmited: () => void;
  annotation?: any;
}

export function NewNoteDisplay({
  onCancel,
  onSubmited,
  annotation,
}: NewNoteProps) {
  const today = new Date();
  const [note, setNote] = useState<string>("");
  const [addedNote, updateAddedNoteToEdit] = useState<boolean>(false);
  const [mail, setMail] = useMail();
  const clearNote = () => setNote("");

  const onFinishNote = () => {
    clearNote();
    onSubmited();
    onCancel();
  };

  const updateNote = async () => {
    const res = await NoteService.updateNote(note, mail.selected!);

    if (res.status == 200) {
      updateAddedNoteToEdit((prev) => !prev);
      onFinishNote();
    }
  };
  useEffect(() => {
    if (mail.isEditMode && annotation && !addedNote) {
      setNote(security.decrypt(annotation.note) ?? "");
      updateAddedNoteToEdit((prev) => !prev);
    }
  });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-2">
        <p className="text-foreground-400 text-sm">
          {!mail.isEditMode ? 2000 - note.length + " caracteres" : ""}
        </p>
        <div className="flex ml-auto items-center gap-2 mr-2">
          <Button variant="ghost" onClick={onFinishNote}>
            Cancelar
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />

          {mail.isEditMode ? (
            <Button onClick={updateNote}>Atualizar</Button>
          ) : (
            <NewNoteDrawer note={note} onSubmited={onFinishNote}>
              <Button>Adicionar</Button>
            </NewNoteDrawer>
          )}
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
              className="w-full h-[90vh] border-none"
              // disabled={note.length >= 2000}
              maxLength={2000}
              defaultValue={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
