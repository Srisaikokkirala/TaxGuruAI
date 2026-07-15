import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownRenderer({ content }) {
  return (
    <div className="message-markdown prose prose-invert max-w-none prose-headings:font-semibold prose-p:text-slate-100 prose-li:text-slate-100 prose-strong:text-white prose-a:text-accent-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');

          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: '1rem',
                  background: '#0b1220',
                  padding: '1rem',
                }}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }

          return (
            <code
              className="rounded-md border border-white/10 bg-white/8 px-1.5 py-0.5 text-[0.9em] text-accent-100"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <pre className="overflow-hidden rounded-2xl">{children}</pre>;
        },
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
