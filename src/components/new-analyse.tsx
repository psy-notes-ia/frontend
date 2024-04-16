"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/registry/new-york/ui/dialog";
import { Label } from "@/registry/new-york/ui/label";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { useState } from "react";

import MultiSelectComponent from "./multi-select";

export function NewAnalyse({ children }: any) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <Dialog>
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
            <Input type="text" id="title" placeholder="Ex. Sarah Martins" />
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
          <Button type="button">Analisar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
