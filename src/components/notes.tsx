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
import { useMail } from "@/utils/use-mail";
import { NoteDisplay } from "./notes-display";
import { NoteList } from "./notes-list";
import { Nav } from "./nav";
import { useSearchParams } from "next/navigation";
import { Button } from "@/registry/new-york/ui/button";

import { NewAnalyse } from "./new-analyse";
import { NewNoteDisplay } from "./new-notes-display";
import NoteService from "@/app/api/repository/NoteService";
import { AnalysesList } from "./analyses-list";
import AnalyseService from "@/app/api/repository/AnalyseService";
import { AllNoteList } from "./all-pacients";
import { AnalyseDisplay } from "./analyse-display";
import Image from "next/image";
import { psypro, psyproSvg } from "@/assets";

interface MailProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Notes({
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const [isAnalyse, setAnlyseMode] = React.useState(false);
  const [newNote, setNewNote] = React.useState(false);
  const [notes, setNotes] = React.useState<any[]>([]);
  const [lastNotes, setLastNotes] = React.useState<any[]>([]);
  const [analyses, setAnalyses] = React.useState<any[]>([]);
  const [mail, setMail] = useMail();

  const params = useSearchParams();

  const changeAnlyseMode = () => setAnlyseMode((prev) => !prev);

  const loadNotesByPacient = (id?: string) => {
    const p = params.get("p");
    var _id = "";
    if (id != undefined) {
      _id = id;
    } else if (p != "all" && p != null) {
      _id = p;
    }

    if (_id != "") {
      NoteService.fetchAllNotesByPacient(_id).then(async (value) => {
        var res = await value.json();
        if (res != null) {
          setNotes(res);
        }
      });
    }
  };

  const loadNotes = () => {
    NoteService.fetchAllNotes().then(async (value) => {
      var res = await value.json();
      if (res != null) {
        setLastNotes(res);
      }
    });
  };

  const loadAnalyses = (id?: string) => {
    const p = params.get("p");
    var _id = "";
    if (id != undefined) {
      _id = id;
    } else if (p != "all" && p != null) {
      _id = p;
    }

    if (_id != "") {
      AnalyseService.fetchAllAnalyses(_id).then(async (value) => {
        var res = await value.json();
        if (res != null) {
          setAnalyses(res);
        }
      });
    }
  };

  const loadAnalyseStatus = () => {
    const p = params.get("p");
    const hasNotAnalysed = analyses.some((e) => e.analysed == false);
    if (hasNotAnalysed && p != "all") {
      loadAnalyses();
    }
  };

  React.useEffect(() => {
    if (location && params.get("p") == null) location.assign("?p=all");
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      loadAnalyseStatus();
    }, 3 * 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    loadNotesByPacient();
    loadAnalyses();
    loadNotes();
  }, []);
  const onClickedNavItens = (id?: string) => {
    setMail({ ...mail, selected: null });
    loadNotesByPacient(id);
    loadAnalyses(id);
  };
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

          className={"w-[260px] transition-all duration-300 ease-in-out"}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center border-r-1",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <Image src={psyproSvg} className="w-1/2" alt="psypro"></Image>
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            onClickItems={(id?: string) => onClickedNavItens(id)}
            onSearchPacient={(e) => {
              // if (e != "") {
              //   var _links = links.filter((l) => l.title.startsWith(e));
              //   setLinks(_links);
              // } else {
              //   setLinks(allLinks);
              // }
            }}
          />
        </div>
        {/* <ResizableHandle /> */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              {/* <h1>Dashboard</h1> */}
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
                {/* <form className="flex-grow">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search" className="pl-8" />
                    </div>
                  </form> */}

                {isAnalyse ? (
                  <NewAnalyse onSubmited={loadAnalyses}>
                    <Button className="w-[200px]">
                      <BarChart2 className="h-4 w-4 mr-2" />
                      Nova Analise
                    </Button>
                  </NewAnalyse>
                ) : (
                  // <NewNoteDrawer>
                  <Button
                    className="w-[200px]"
                    onClick={() => setNewNote((prev) => !prev)}
                  >
                    <FilePlus2 className="h-4 w-4 mr-2" />
                    Nova anotação
                  </Button>
                  // </NewNoteDrawer>
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
                <NoteList items={notes} />
              ) : (
                <AllNoteList items={lastNotes} />
              )}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              {params.get("p") != "all" ? (
                <AnalysesList items={analyses} />
              ) : (
                <AllNoteList items={lastNotes} />
              )}
            </TabsContent>
          </Tabs>
          {/* <AllPacients /> */}
        </ResizablePanel>
        <ResizableHandle withHandle />

        {/* {mail.selected != null && ( */}
        <ResizablePanel defaultSize={defaultLayout[2]}>
          {newNote ? (
            <NewNoteDisplay
              onCancel={() => setNewNote((prev) => !prev)}
              onSubmited={loadNotesByPacient}
            />
          ) : isAnalyse ? (
            <AnalyseDisplay
              analyse={
                analyses.find((item) => item.id === mail.selected) || null
              }
            />
          ) : (
            <NoteDisplay
              deleteButton={params.get("p") != "all"}
              onNoteDeleted={loadNotesByPacient}
              note={
                notes.find((item) => item.id === mail.selected) ||
                lastNotes.find((item) => item.id === mail.selected)
              }
            />
          )}
        </ResizablePanel>
        {/* )} */}
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}

const AllPacients = () => {
  return <div className="h-screen w-full p-6">All</div>;
};
