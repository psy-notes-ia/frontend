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

export default function NewNoteDrawer({ children }: any) {
  const [date, setDate] = React.useState<Date>();
  const [tags, setTags] = React.useState([]);
  const [seeNote, setSeeNote] = React.useState(false);

  const onSubmit = () => {
    if (!seeNote) {
      changeNoteVisibility();
    } else {
      console.log("go");
    }
  };

  const changeNoteVisibility = () => setSeeNote((prev) => !prev);
  return (
    <Drawer dismissible={false} onClose={changeNoteVisibility}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Nova anotação</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="p-4 pb-4 space-y-4 max-w-lg">
            {seeNote ? (
              <div className="grid w-full max-w-lg items-center gap-1.5">
                <Label htmlFor="note">Anotação*</Label>
                <Textarea
                  id="note"
                  placeholder="Adicione aqui sua anotação."
                  rows={20}
                />
              </div>
            ) : (
              <>
                <div className="grid w-full max-w-lg items-center gap-1.5">
                  <Label htmlFor="email">Titulo</Label>
                  <Input
                    type="text"
                    id="email"
                    placeholder="Ex. Sarah Martins"
                  />
                </div>
                <div className="grid w-full max-w-lg items-center gap-1.5">
                  <Label htmlFor="data">Data da sessão*</Label>
                  <DatePickerInput onChange={setDate} value={date} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="email">Tags</Label>
                  <TagInputComponent onChange={setTags} values={tags} />
                </div>
              </>
            )}
          </div>

          <DrawerFooter>
            <Button onClick={onSubmit}>Continuar</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
