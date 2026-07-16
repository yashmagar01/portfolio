import { type ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let k = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**'))
      parts.push(<strong key={k++}>{token.slice(2, -2)}</strong>);
    else if (token.startsWith('`'))
      parts.push(
        <code
          key={k++}
          className="rounded bg-muted px-1.5 py-0.5 text-[0.88em] text-syntax-string font-mono"
        >
          {token.slice(1, -1)}
        </code>,
      );
    else if (token.startsWith('[')) {
      const m = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (m)
        parts.push(
          <a
            key={k++}
            href={m[2]}
            target={m[2].startsWith('http') ? '_blank' : undefined}
            rel={m[2].startsWith('http') ? 'noreferrer' : undefined}
            className="text-primary underline-offset-4 hover:underline"
          >
            {m[1]}
          </a>,
        );
    } else if (token.startsWith('*'))
      parts.push(<em key={k++}>{token.slice(1, -1)}</em>);
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

interface RenderBodyProps {
  body: string;
}

export function RenderBody({ body }: RenderBodyProps) {
  const blocks = body.split(/\n\n+/);
  const elements: ReactNode[] = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    // Fenced code block — collect until closing fence
    if (block.startsWith('```')) {
      const lines = block.split('\n');
      const lang = lines[0].slice(3).trim() || undefined;
      // Check if closing fence is in the same block
      if (lines.length > 1 && lines[lines.length - 1] === '```') {
        const code = lines.slice(1, -1).join('\n');
        elements.push(<CodeBlock key={i} code={code} language={lang} />);
      } else {
        // Multi-block fence — collect until we find the closing ```
        let codeLines = lines.slice(1);
        let j = i + 1;
        while (j < blocks.length) {
          const next = blocks[j];
          if (next.trimEnd() === '```') {
            j++;
            break;
          }
          codeLines = codeLines.concat(['', ...next.split('\n')]);
          if (next.split('\n').some((l) => l.trimEnd() === '```')) {
            codeLines = codeLines.slice(0, codeLines.lastIndexOf('```'));
            j++;
            break;
          }
          j++;
        }
        elements.push(<CodeBlock key={i} code={codeLines.join('\n')} language={lang} />);
        i = j;
        continue;
      }
    }
    // h1
    else if (block.startsWith('# ')) {
      const text = block.slice(2);
      elements.push(
        <h1 key={i} className="text-3xl font-bold tracking-tight mt-2 mb-5">
          {text}
        </h1>,
      );
    }
    // h2
    else if (block.startsWith('## ')) {
      const text = block.slice(3);
      elements.push(
        <h2
          key={i}
          id={slugify(text)}
          className="text-2xl font-bold tracking-tight mt-12 mb-4 scroll-mt-24"
        >
          {text}
        </h2>,
      );
    }
    // h3
    else if (block.startsWith('### ')) {
      const text = block.slice(4);
      elements.push(
        <h3
          key={i}
          id={slugify(text)}
          className="text-xl font-semibold mt-8 mb-3 scroll-mt-24"
        >
          {text}
        </h3>,
      );
    }
    // h4
    else if (block.startsWith('#### ')) {
      elements.push(
        <h4 key={i} className="text-lg font-semibold mt-6 mb-2">
          {block.slice(5)}
        </h4>,
      );
    }
    // Blockquote
    else if (block.startsWith('> ')) {
      const content = block
        .split('\n')
        .map((l) => l.replace(/^>\s?/, ''))
        .join(' ');
      elements.push(
        <blockquote
          key={i}
          className="my-6 border-l-2 border-primary/40 pl-5 italic text-muted-foreground"
        >
          {renderInline(content)}
        </blockquote>,
      );
    }
    // Horizontal rule
    else if (/^---+$/.test(block.trim())) {
      elements.push(<hr key={i} className="my-10 border-border" />);
    }
    // Unordered list
    else if (/^\s*[-*]\s/.test(block) && block.split('\n').every((l) => /^\s*[-*]\s/.test(l))) {
      elements.push(
        <ul key={i} className="my-5 space-y-2 pl-6">
          {block.split('\n').map((line, j) => (
            <li key={j} className="list-disc leading-relaxed text-[15px]">
              {renderInline(line.replace(/^\s*[-*]\s/, ''))}
            </li>
          ))}
        </ul>,
      );
    }
    // Ordered list
    else if (
      /^\s*\d+\.\s/.test(block) &&
      block.split('\n').every((l) => /^\s*\d+\.\s/.test(l))
    ) {
      elements.push(
        <ol key={i} className="my-5 space-y-2 pl-6">
          {block.split('\n').map((line, j) => (
            <li key={j} className="list-decimal leading-relaxed text-[15px]">
              {renderInline(line.replace(/^\s*\d+\.\s/, ''))}
            </li>
          ))}
        </ol>,
      );
    }
    // Paragraph
    else if (block.trim()) {
      elements.push(
        <p key={i} className="my-5 leading-[1.85] text-[15.5px] text-foreground/90">
          {renderInline(block)}
        </p>,
      );
    }

    i++;
  }

  return <div className="blog-body">{elements}</div>;
}
