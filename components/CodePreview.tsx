"use client";

import parse, { Element, DOMNode } from "html-react-parser";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Render mixed HTML + code blocks
export function renderContent(html: string) {
  return parse(html, {
    replace: (domNode: DOMNode) => {
      // Only handle <pre> tags
      if (domNode.type === "tag" && domNode.name === "pre") {
        const preElement = domNode as Element;

        // Find <code> inside <pre>
        const codeNode = preElement.children.find(
          (child): child is Element =>
            child.type === "tag" && child.name === "code"
        );

        if (codeNode) {
          // Extract code text
          const codeText = codeNode.children
            .map((c) => ("data" in c ? c.data : ""))
            .join("");

          // Extract language from class
          const langClass = codeNode.attribs?.class || "";
          const language = langClass.replace("language-", "") || "plaintext";

          return (
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              showLineNumbers
              customStyle={{
                borderRadius: 8,
                padding: 12,
                margin: "16px 0",
                fontSize: "0.9rem",
              }}
            >
              {codeText.trim()}
            </SyntaxHighlighter>
          );
        }
      }
    },
  });
}
