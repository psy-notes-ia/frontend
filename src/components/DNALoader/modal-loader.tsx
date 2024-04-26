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

import { useSearchParams } from "next/navigation";
import AnalyseService from "@/app/api/repository/AnalyseService";
import DNALoader from ".";

export function LoaderModal({ open, onChangeDialog, children }: any) {
 
  return (
    <Dialog open={open} onOpenChange={onChangeDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader></DialogHeader>
        <div className="flex flex-col justify-center items-center space-y-2">
          <DNALoader />
          <h2 className="text-foreground-500 text-xl mt-2">Analisando...</h2>
        </div>
        <DialogFooter className="sm:justify-end"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
