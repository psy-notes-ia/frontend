"use client";

import * as React from "react";
import {
  Archive,
  ArchiveX,
  BarChart2,
  File,
  FilePlus2,
  Inbox,
  Search,
  Send,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/registry/new-york/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/new-york/ui/resizable";
import { Separator } from "@/registry/new-york/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import { TooltipProvider } from "@/registry/new-york/ui/tooltip";
import { useMail } from "@/app/use-mail";
import { MailDisplay } from "./notes-display";
import { MailList } from "./notes-list";
import { Nav } from "./nav";
import { Mail } from "@/app/data";
import { useSearchParams } from "next/navigation";
import { Button } from "@/registry/new-york/ui/button";

import NewNoteDrawer from "./new-note";
import { NewAnalyse } from "./new-analyse";
// import { AccountSwitcher } from "@/app/(app)/examples/mail/components/account-switcher"
// import { MailDisplay } from "@/app/(app)/examples/mail/components/mail-display"
// import { MailList } from "@/app/(app)/examples/mail/components/mail-list"
// import { Nav } from "@/app/(app)/examples/mail/components/nav"
// import { type Mail } from "@/app/(app)/examples/mail/data"
// import { useMail } from "@/app/(app)/examples/mail/use-mail"

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const [isAnalyse, setAnlyseMode] = React.useState(false);

  const changeAnlyseMode = () => setAnlyseMode((prev) => !prev);
  const allLinks: {
    title: string;
    link: string;
    label?: string;
    variant: "default" | "ghost";
  }[] = [
    {
      title: "#",
      label: "128",

      link: "?p=all",
      variant: "default",
    },
    {
      title: "Jackson Aguiar",
      label: "9",
      link: "?p=f2bae870-9e5b-4343-84d7-5dfbb7ecf5c2",
      variant: "ghost",
    },
    {
      title: "Romulo Neto",
      label: "",
      link: "?p=76f31560-8b3f-4c49-850a-50c01c2c012b",
      variant: "ghost",
    },
    {
      title: "Rodrigo Santos",
      label: "23",
      link: "?p=dc9dab3f-5c3c-4e85-b1b6-3b9ae3321538",
      variant: "ghost",
    },
  ];
  const [links, setLinks] = React.useState<
    {
      title: string;
      link: string;
      label?: string;
      variant: "default" | "ghost";
    }[]
  >(allLinks);
  const [mail] = useMail();

  const params = useSearchParams();

  if (params.get("p") == null) {
    location.replace("?p=all");
  }
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <div
          // defaultSize={defaultLayout[0]}
          // collapsedSize={navCollapsedSize}
          // collapsible={false}
          // minSize={15}
          // maxSize={20}
          // onCollapse={(collapsed: any) => {
          //   setIsCollapsed(collapsed)
          //   document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
          //     collapsed
          //   )}`
          // }}

          className={"w-[250px] transition-all duration-300 ease-in-out"}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          ></div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={links}
            onSearchPacient={(e) => {
              if (e != "") {
                var _links = links.filter((l) => l.title.startsWith(e));

                setLinks(_links);
              } else {
                setLinks(allLinks);
              }
            }}
          />
        </div>
        {/* <ResizableHandle /> */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1>Dashboard</h1>
              <TabsList className="ml-auto">
                {params.get("p") != "all" && (
                  <TabsTrigger
                    value="all"
                    className="text-zinc-600 dark:text-zinc-200"
                    onClick={changeAnlyseMode}
                  >
                    Anotações
                  </TabsTrigger>
                )}
                {params.get("p") != "all" && (
                  <TabsTrigger
                    value="unread"
                    className="text-zinc-600 dark:text-zinc-200"
                    onClick={changeAnlyseMode}
                  >
                    Analises
                  </TabsTrigger>
                )}
              </TabsList>
            </div>
            <Separator />

            {params.get("p") != "all" && (
              <div className=" flex space-x-1 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form className="flex-grow">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search" className="pl-8" />
                  </div>
                </form>

                {isAnalyse ? (
                  <NewAnalyse>
                    <Button>
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Nova Analise
                    </Button>
                  </NewAnalyse>
                ) : (
                  <NewNoteDrawer>
                    <Button>
                      <FilePlus2 className="h-4 w-4 mr-2" />
                      Nova anotação
                    </Button>
                  </NewNoteDrawer>
                )}
                {/* <NewNoteDrawer>
                  <Button>
                    <FilePlus2 className="h-4 w-4 mr-2" />
                    Nova anotação
                  </Button>
                </NewNoteDrawer> */}
              </div>
            )}
            <TabsContent value="all" className="m-0">
              {params.get("p") != "all" ? (
                <MailList
                  items={mails.filter((item) =>
                    params.get("p") != "all"
                      ? item.uid == params.get("p")
                      : true
                  )}
                />
              ) : (
                <AllPacients />
              )}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
          {/* <AllPacients /> */}
        </ResizablePanel>
        <ResizableHandle withHandle />

        {params.get("p") != "all" && (
          <ResizablePanel defaultSize={defaultLayout[2]}>
            <MailDisplay
              mail={mails.find((item) => item.id === mail.selected) || null}
            />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

const AllPacients = () => {
  return <div className="h-screen w-full p-6">All</div>;
};
