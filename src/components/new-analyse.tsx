"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/registry/new-york/ui/dialog";
import { Label } from "@/registry/new-york/ui/label";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { useState } from "react";

import MultiSelectComponent from "./multi-select";
import { useSearchParams } from "next/navigation";
import AnalyseService from "@/app/api/repository/AnalyseService";

export function NewAnalyse({ children, onSubmited }: any) {
  const params = useSearchParams();

  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const onSubmit = async () => {
    const pacientId = params.get("p");

    const data = {
      title,
      notes: selectedOptions.map((e: any) => e.value),
      pacientId,
    };

    const res = await AnalyseService.createAnalyse(data);

    if (res.status == 201) {
      onSubmited();
      setOpen((prev) => !prev);
      clear();
    }
  };

  const clear = () => {
    setTitle("");
    setSelectedOptions([]);
  };
  const onChangeDialog = () => {
    setOpen((prev) => !prev);
    clear();
  };

  return (
    <Dialog open={open} onOpenChange={onChangeDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova analise</DialogTitle>
          {/* <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col items-center space-y-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Título</Label>
            <Input
              type="text"
              id="title"
              placeholder="Ex. Analise 1"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="notes">Selecione as notas para analise</Label>

            <MultiSelectComponent
              onChange={setSelectedOptions}
              values={selectedOptions}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          {/* <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose> */}
          {/* <DialogClose asChild> */}
          <Button type="button" onClick={onSubmit}>
            Analisar
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
