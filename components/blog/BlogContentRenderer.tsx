"use client";

import { useState } from "react";
import parse, { Element, DOMNode } from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 z-10 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        customStyle={{
          borderRadius: 12,
          padding: 16,
          fontSize: "0.875rem",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export function BlogContentRenderer({ content }: { content: string }) {
  return (
    <div className="blog-prose prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-a:text-green-600 dark:prose-a:text-green-400 prose-code:before:content-none prose-code:after:content-none">
      {parse(content, {
        replace: (domNode: DOMNode) => {
          if (domNode.type === "tag" && domNode.name === "pre") {
            const preElement = domNode as Element;
            const codeNode = preElement.children.find(
              (child): child is Element =>
                child.type === "tag" && child.name === "code"
            );
            if (codeNode) {
              const codeText = codeNode.children
                .map((c) => ("data" in c ? c.data : ""))
                .join("");
              const langClass = codeNode.attribs?.class || "";
              const language = langClass.replace("language-", "") || "plaintext";
              return <CodeBlock code={codeText.trim()} language={language} />;
            }
          }
        },
      })}
    </div>
  );
}
