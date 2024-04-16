"use client";

import Link from "next/link";
import { LucideIcon, Search, ChevronDown, UserPlus2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";
import { Input } from "@/registry/new-york/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback } from "@/registry/new-york/ui/avatar";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { DropdownMenuComponent } from "./dropdown";
import { Button } from "@/registry/new-york/ui/button";
import { NewPacient } from "./new-pacient";

interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    link: string;
    label?: string;
    variant: "default" | "ghost";
  }[];
  onSearchPacient: (value: string) => void;
}

export function Nav({ links, isCollapsed, onSearchPacient }: NavProps) {
  const params = useSearchParams();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 h-full border-r-[1px]"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <DropdownMenuComponent>
          <div className="mb-2 cursor-pointer transition-colors hover:border-black bg-gray-100 flex items-center justify-between gap-2 border rounded-[8px] p-2">
            <div className="avatar rounded-full min-h-8 min-w-8 bg-emerald-500 text-white font-[700] flex items-center justify-center">
              <p>GD</p>
            </div>
            <div className="grow">
              <p className="text-[13px] font-bold">Guillaume Duhan</p>
              <p className="text-[10px] text-neutral-500">
                codewithguillaume@gmail.com
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
                onChange={(e) => onSearchPacient(e.target.value)}
              />
            </div>
          </form>
        </div>
        {links.map(
          (l, index) => (
            <Link
              key={index}
              href={"/" + l.link}
              className={cn(
                buttonVariants({
                  variant:
                    "?p=" + params.get("p") === l.link ? "default" : "ghost",
                  size: "sm",
                }),
                "?p=" + params.get("p") === l.link &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              {/* <l.icon className="h-4 w-4" /> */}
              <Avatar className="h-5 w-5 mr-2">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}

                <AvatarFallback className="text-black">
                  {" "}
                  {l.title.substring(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {l.title}
              {l.label && (
                <span
                  className={cn(
                    "ml-auto",
                    l.variant === "default" && "text-background dark:text-white"
                  )}
                >
                  {l.label}
                </span>
              )}
            </Link>
          )
          // )
        )}
      </nav>
      <div className="fixed bottom-2 left-3">
        <NewPacient>
          <Button variant={"outline"} className="m-2 w-full">
            <UserPlus2 className="mr-2" size="15" />
            Adicionar paciente
          </Button>
        </NewPacient>
      </div>
    </div>
  );
}
