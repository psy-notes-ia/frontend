"use client";

import Link from "next/link";
import { Search, ChevronDown, UserPlus2, Trash2, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";

import { Input } from "@/registry/new-york/ui/input";
import { Avatar, AvatarFallback } from "@/registry/new-york/ui/avatar";
import { useSearchParams } from "next/navigation";
import { DropdownMenuComponent } from "./dropdown";
import { Button } from "@/registry/new-york/ui/button";
import { NewPacient } from "./new-pacient";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PacientService from "@/app/api/repository/PacientService";
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "@/registry/new-york/ui/tooltip";

import ConfirmActionDialog from "./Modals/ConfirmModal";

interface NavProps {
  isCollapsed: boolean;
  onSearchPacient: (value: string) => void;
  onClickItems: (id?: string) => void;
}

export function Nav({ isCollapsed, onSearchPacient, onClickItems }: NavProps) {
  const params = useSearchParams();
  const session = useSession();
  const [pacients, setPacients] = useState([]);

  const loadPacients = () => {
    PacientService.getAll().then(async (value) => {
      var res = await value.json();
      if (res != null) {
        setPacients(res);
      }
    });
  };
  const deletePacient = async (id: string) => {
    var res = await PacientService.delete(id);
    const pid = params.get("p")!;
    if (res.status == 200) {
      if (pid == id) {
        location.replace("?p=all");
      } else {
        loadPacients();
      }
    }
  };
  const loadPacientsByQuery = (q: string) => {
    // if (q.length > 3) {
    //   PacientService.searchByQuery(q).then(async (value) => {
    //     var res = await value.json();
    //     if (res != null) {
    //       setPacients(res);
    //     }
    //   });
    // } else {
    //   loadPacients();
    // }

    if (q != "" && q.length > 3) {
      var _pacients = pacients.filter((p: any) => p.name.startsWith(q));
      setPacients(_pacients);
    } else {
      loadPacients();
    }
  };

  useEffect(() => {
    loadPacients();
  }, []);

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-full border-r-[1px]"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <DropdownMenuComponent
          signout={() =>
            signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL })
          }
        >
          <div className="mb-2 cursor-pointer transition-colors hover:border-black bg-gray-100 flex items-center justify-between gap-2 border rounded-[8px] p-2">
            <div className="avatar rounded-full min-h-8 min-w-8 bg-[#0b9de6] text-white font-[700] flex items-center justify-center">
              <p>
                {(
                  session.data?.user?.name?.split("")[0] +
                  session.data?.user?.name?.split("")[1]!
                ).toUpperCase()}
              </p>
            </div>
            <div className="grow">
              <p className="text-[13px] font-bold">
                {session.data?.user?.name}
              </p>
              <p className="text-[10px] text-neutral-500">
                {session.data?.user?.email}
              </p>
            </div>
            <ChevronDown className="text-[#d4d4d4]" />
          </div>
        </DropdownMenuComponent>
        <h1 className="pt-2 font-semibold text-xl">Pacientes</h1>
        <div className="bg-background/95 mb-2 pt-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-8"
                onChange={(e) => loadPacientsByQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        <Link
          href={"?p=all"}
          onClick={() => onClickItems()}
          className={cn(
            buttonVariants({
              variant: params.get("p") === "all" ? "default" : "ghost",
              size: "sm",
            }),
            params.get("p") === "all" &&
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            "justify-start"
          )}
        >
          <Avatar className="h-5 w-5 mr-2">
            <AvatarFallback className="text-black">#</AvatarFallback>
          </Avatar>
          Todos
        </Link>
        <div className="h-[55vh] overflow-auto">
          {pacients.length == 0 ? (
            <span className="text-foreground-400 text-sm m-auto">Adicione seu primeiro paciente</span>
          ) : (
            pacients.map((p: any, index) => (
              <div className="flex w-full" key={index}>
                <Link
                  key={index}
                  href={"?p=" + p.id}
                  onClick={() => onClickItems(p.id)}
                  className={cn(
                    buttonVariants({
                      variant: params.get("p") === p.id ? "default" : "ghost",
                      size: "sm",
                    }),
                    params.get("p") === p.id &&
                      "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                    "justify-start  w-full"
                  )}
                >
                  <Avatar className="h-5 w-5 mr-2">
                    <AvatarFallback className="text-black">
                      {" "}
                      {p.name.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {p.name}
                  {p._count.Notes != 0 && (
                    <span
                      className={cn(
                        "ml-auto",
                        params.get("p") === p.id &&
                          "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      {p._count.Notes}
                    </span>
                  )}
                </Link>
                {params.get("p") === p.id && (
                  <Tooltip>
                    <ConfirmActionDialog
                      description={`O paciente ${p.name} será excluido!`}
                      onSubmit={(res) => (res ? deletePacient(p.id) : null)}
                    >
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <XCircle className="h-3 w-3 text-red-400" />
                          <span className="sr-only">Remover</span>
                        </Button>
                      </TooltipTrigger>
                    </ConfirmActionDialog>

                    <TooltipContent>Remover Paciente</TooltipContent>
                  </Tooltip>
                )}
              </div>
            ))
          )}
        </div>
      </nav>
      <div className="fixed bottom-2 left-3">
        <NewPacient onSubmited={loadPacients}>
          <Button variant={"outline"} className="m-2 w-full">
            <UserPlus2 className="mr-2" size="15" />
            Adicionar paciente
          </Button>
        </NewPacient>
      </div>
    </div>
  );
}
