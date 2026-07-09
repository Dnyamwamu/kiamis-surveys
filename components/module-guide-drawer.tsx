"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle, Loader2, Info, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ModuleGuideDrawerProps {
  module: string;
  title: string;
}

export function ModuleGuideDrawer({ module, title }: ModuleGuideDrawerProps) {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocs() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/docs/${module}.md`);
        if (!response.ok) {
          throw new Error("Failed to load documentation");
        }
        const text = await response.text();
        setContent(text);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDocs();
  }, [module]);

  const renderMarkdown = (text: string) => {
    if (!text) return null;

    const lines = text.split("\n");
    let inList = false;
    let listItems: React.ReactNode[] = [];

    return lines.map((line, index) => {
      // Headers
      if (line.startsWith("# ")) {
        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4 text-green-700 border-b pb-2">{line.replace("# ", "")}</h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={index} className="text-xl font-semibold mt-5 mb-3 text-green-600">{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={index} className="text-lg font-medium mt-4 mb-2 text-foreground">{line.replace("### ", "")}</h3>;
      }

      // Alerts
      if (line.startsWith("> [!")) {
        const typeMatch = line.match(/> \[!(.*?)\]/);
        const type = typeMatch ? typeMatch[1].toUpperCase() : "NOTE";
        const contentStr = line.replace(/> \[!.*?\]/, "").trim();
        
        let icon = <Info className="h-4 w-4" />;
        let bgColor = "bg-blue-50 border-blue-200 text-blue-800";
        
        if (type === "IMPORTANT" || type === "WARNING") {
          icon = <AlertTriangle className="h-4 w-4" />;
          bgColor = "bg-amber-50 border-amber-200 text-amber-800";
        } else if (type === "TIP") {
          icon = <CheckCircle2 className="h-4 w-4" />;
          bgColor = "bg-green-50 border-green-200 text-green-800";
        }

        return (
          <div key={index} className={`my-4 p-4 rounded-lg border flex gap-3 ${bgColor}`}>
            <div className="mt-0.5">{icon}</div>
            <div>
              <div className="text-xs font-bold mb-1 uppercase">{type}</div>
              <div className="text-sm">{contentStr}</div>
            </div>
          </div>
        );
      }

      // Lists
      const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
      if (listMatch) {
        const indent = listMatch[1].length;
        const isOrdered = /\d+\./.test(listMatch[2]);
        const listContent = listMatch[3];

        return (
          <div key={index} className={`flex items-start gap-2 my-1 ${indent > 0 ? "ml-6" : "ml-2"}`}>
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" />
            <span className="text-sm leading-relaxed">{parseInlineStyles(listContent)}</span>
          </div>
        );
      }

      // Empty space
      if (line.trim() === "") {
        return <div key={index} className="h-2" />;
      }

      // Regular paragraph
      return (
        <p key={index} className="text-sm leading-relaxed mb-2 text-muted-foreground">
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  const parseInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      // Bold
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
      }
      // Links
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return <span key={i} className="text-green-600 font-medium underline underline-offset-4">{linkMatch[1]}</span>;
      }
      return part;
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 border-green-200 hover:bg-green-50 text-green-700">
          <HelpCircle className="h-4 w-4" />
          
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl p-0">
        <SheetHeader className="p-6 pb-4 border-b bg-green-50/30">
          <div className="flex items-center gap-2 mb-1 text-green-600">
            <HelpCircle className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">User Manual</span>
          </div>
          <SheetTitle className="text-2xl font-bold">{title} User Guide</SheetTitle>
          <SheetDescription>
            Step-by-step instructions for the {title} module.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-8 pb-12">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                <p className="text-sm text-muted-foreground">Loading documentation...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10 bg-red-50 rounded-lg border border-red-100">
                <p className="text-red-600 font-medium mb-2">Oops! Something went wrong.</p>
                <p className="text-sm text-red-400">{error}</p>
                <Button variant="ghost" size="sm" className="mt-4" onClick={() => window.location.reload()}>
                  Try again
                </Button>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                {renderMarkdown(content)}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
