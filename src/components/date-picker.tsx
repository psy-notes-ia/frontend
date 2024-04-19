"use client";

import * as React from "react";
import { format } from "date-fns";
import {Calendar as CalendarIcon } from "lucide-react";
import { ptBR } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/registry/new-york/ui/popover";
import { Button } from "@/registry/new-york/ui/button";
import { Calendar } from "@/registry/new-york/ui/calendar";

export function DatePickerInput({
  onChange,
  value,
}: {
  onChange: (value: Date | undefined) => void;
  value: Date | undefined;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP",{locale:ptBR}) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
        //   initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
