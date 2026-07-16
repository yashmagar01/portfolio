import { createFileRoute } from "@tanstack/react-router";
import { IDEWorkspace } from "@/components/ide/Workspace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yash — Developer Portfolio" },
      {
        name: "description",
        content:
          "Yash — Computer Engineering student & independent developer. Projects, writing, and vlogs, arranged like a code editor.",
      },
      { property: "og:title", content: "Yash — Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Yash — Computer Engineering student & independent developer. Projects, writing, and vlogs, arranged like a code editor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Yash — Developer Portfolio" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return <IDEWorkspace />;
}
