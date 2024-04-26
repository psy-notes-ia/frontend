import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/registry/new-york/ui/dialog";
import { Label } from "@/registry/new-york/ui/label";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";
import { useState } from "react";
import PacientService from "@/app/api/repository/PacientService";

export function NewPacient({ children, onSubmited }: any) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    if (name != "" && age != 0 && reason != "") {
      const res = await PacientService.createOne({ name, age, reason });

      if (res.status === 201) {
        onSubmited();
      }
      setOpen((prev) => !prev);
    }
  };

  const onChange = ()=>{
    setOpen((prev) => !prev);
  }
  

  return (
    <Dialog open={open}  onOpenChange={onChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo paciente</DialogTitle>
          {/* <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex flex-col space-y-4 items-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Nome do paciente*</Label>
            <Input
              type="text"
              id="email"
              placeholder="Ex. Sarah Martins"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Idade do paciente*</Label>
            <Input
              type="number"
              id="email"
              placeholder="Ex. 35"
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Motivo do tratamento*</Label>
            <Input
              type="text"
              id="email"
              placeholder="Ex. Superar decepção emocional"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>

          <Button type="button" onClick={onSubmit}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
