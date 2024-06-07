"use client";
import * as React from "react";
import { BarChart, Minus, Plus } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/registry/new-york/ui/drawer";
import { Button } from "@/registry/new-york/ui/button";
import { Label } from "@/registry/new-york/ui/label";
import { Input } from "@/registry/new-york/ui/input";
import { DatePickerInput } from "./date-picker";
import { Textarea } from "@/registry/new-york/ui/textarea";
import TagInputComponent from "./tag-input";
import NoteService from "@/app/api/repository/NoteService";
import { useSearchParams } from "next/navigation";

export default function NewNoteDrawer({ children, note, onSubmited }: any) {
  const [date, setDate] = React.useState<Date>();
  const [tags, setTags] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [seeNote, setSeeNote] = React.useState(false);
  const params = useSearchParams();

  const onSubmit = async () => {
    
      const pacientId = params.get("p");

      var _tags = tags.map((e:any)=>e.text);
      const data = {
        session: date,
        tags:_tags,
        title,
        note,
        pacientId,
      };

      await NoteService.createNote(data);

      onSubmited();
      setOpen((prev) => !prev);
    };

  return (
    <Drawer
      dismissible={false}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Nova anotação</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="p-4 pb-4 space-y-4 max-w-lg">
            <div className="grid w-full max-w-lg items-center gap-1.5">
              <Label htmlFor="title">Titulo</Label>
              <Input
                type="text"
                id="title"
                placeholder="Ex. Anotação semana 1"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-lg items-center gap-1.5">
              <Label htmlFor="date">Data da sessão*</Label>
              <DatePickerInput onChange={setDate} value={date} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Tags</Label>
              <TagInputComponent onChange={setTags} values={tags} />
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={onSubmit}>Salvar</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
