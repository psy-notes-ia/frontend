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
import { Copy } from "lucide-react";

export function NewPacient({ children }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo paciente</DialogTitle>
          {/* <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Nome do paciente</Label>
            <Input type="text" id="email" placeholder="Ex. Sarah Martins" />
          </div>
        </div>
        <DialogFooter className="sm:justify-end mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
