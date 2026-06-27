import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = true;

export async function getStaticPaths() {
    const docs = await getCollection("docs");
    return docs.map((doc) => ({
        params: { slug: doc.id },
    }));
}

export const GET: APIRoute = async ({ params }) => {
    const { slug } = params;

    if (!slug) {
        return new Response("Not found", { status: 404 });
    }

    const docs = await getCollection("docs");

    // Try to find exact match
    let doc = docs.find((d) => d.id === slug);

    // If not found, try to find a post that ends with the slug
    if (!doc) {
        doc = docs.find((d) => d.id.startsWith(`posts/${slug}`));
    }

    if (!doc) {
        return new Response("/404", { status: 404 });
    }

    return new Response(doc.body, {
        headers: { 'Content-Type': 'text/markdown' }
    });
}
