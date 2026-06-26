"use client";

import { Twitter, Linkedin, Link2, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BlogShareButtonsProps {
  title: string;
  url: string;
}

export default function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share article">
      <span className="mr-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        Share:
      </span>
      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
      <Button variant="outline" size="icon" onClick={copyLink} aria-label="Copy link">
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
