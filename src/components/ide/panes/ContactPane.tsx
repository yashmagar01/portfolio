import { useEffect, useState } from 'react';
import { useForm } from '@formspree/react';
import { z } from 'zod';
import { toast } from 'sonner';
import { profile } from '@/data/portfolio';
import { CommentCaption, EditorContainer, Item, KeywordLabel } from './editor-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';

const schema = z.object({
  name: z.string().trim().min(1, 'name required').max(80),
  email: z.string().trim().email('valid email required').max(200),
  message: z.string().trim().min(4, 'at least a few words').max(1500),
});

const FORMSPREE_ID = 'xkodjwrb';

export function ContactPane() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, message });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    await handleSubmit(e);
  };

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message delivered — I'll get back within a day or two.");
      setName('');
      setEmail('');
      setMessage('');
    }
  }, [state.succeeded]);

  return (
    <EditorContainer>
      <Item>
        <KeywordLabel># contact.json</KeywordLabel>
      </Item>
      <Item className="mt-3">
        <h1 className="text-3xl font-semibold tracking-tight">Get in touch</h1>
      </Item>
      <Item className="mt-2">
        <CommentCaption>
          fill in the object below — it lands in my inbox. or use one of the links.
        </CommentCaption>
      </Item>

      <Item className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
        <div className="border-b border-border bg-muted/40 px-4 py-2 font-mono text-[11px] text-muted-foreground">
          contact.json — editing
        </div>
        <form onSubmit={submit} className="p-5 font-mono text-[13px]">
          <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 leading-relaxed">
            <span className="text-line-number select-none">1</span>
            <span>{'{'}</span>

            <span className="text-line-number select-none">2</span>
            <JsonField
              label="name"
              value={name}
              onChange={setName}
              placeholder="your name"
              error={errors.name}
            />

            <span className="text-line-number select-none">3</span>
            <JsonField
              label="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              type="email"
              error={errors.email}
            />

            <span className="text-line-number select-none">4</span>
            <JsonTextarea
              label="message"
              value={message}
              onChange={setMessage}
              placeholder="what are you working on?"
              error={errors.message}
            />

            <span className="text-line-number select-none">5</span>
            <span>{'}'}</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] text-syntax-comment">// usually reply within 24-48h · IST</p>
            <Button type="submit" disabled={state.submitting}>
              <Send className="h-3.5 w-3.5" />
              {state.submitting ? 'sending…' : 'send message'}
            </Button>
          </div>
        </form>
      </Item>

      <Item className="mt-8 grid gap-3 sm:grid-cols-2">
        <ContactLink
          Icon={Mail}
          label="email"
          value={profile.email}
          href={`mailto:${profile.email}`}
        />
        <ContactLink Icon={Github} label="github" value="@yashmagar01" href={profile.github} />
        <ContactLink
          Icon={Linkedin}
          label="linkedin"
          value="in/yash-magar"
          href={profile.linkedin}
        />
        <ContactLink
          Icon={Twitter}
          label="twitter"
          value="@yashmag50534849"
          href={profile.twitter}
        />
      </Item>
    </EditorContainer>
  );
}

function JsonField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-1.5 pl-4">
      <span className="text-syntax-var">"{label}"</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-syntax-string">"</span>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-6 w-auto min-w-[200px] flex-1 rounded-none border-0 border-b border-dashed border-border bg-transparent px-0 font-mono text-[13px] text-syntax-string shadow-none placeholder:text-syntax-string/40 focus-visible:border-primary focus-visible:ring-0"
      />
      <span className="text-syntax-string">",</span>
      {error && <span className="ml-1 text-[11px] text-destructive">// {error}</span>}
    </div>
  );
}

function JsonTextarea({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1 pl-4">
      <div className="flex items-baseline gap-1.5">
        <span className="text-syntax-var">"{label}"</span>
        <span className="text-muted-foreground">:</span>
        <span className="text-syntax-string">"</span>
        {error && <span className="ml-1 text-[11px] text-destructive">// {error}</span>}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="rounded-md border border-dashed border-border bg-background font-mono text-[13px] text-syntax-string placeholder:text-syntax-string/40 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
      />
      <span className="text-syntax-string">"</span>
    </div>
  );
}

function ContactLink({
  Icon,
  label,
  value,
  href,
}: {
  Icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-panel"
    >
      <div className="grid h-10 w-10 place-items-center rounded-md bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="h-4 w-4" strokeWidth={1.6} />
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="truncate font-mono text-[13px] text-foreground group-hover:text-primary">
          {value}
        </div>
      </div>
    </a>
  );
}
