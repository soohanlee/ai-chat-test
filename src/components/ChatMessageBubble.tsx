import type { Message } from "ai/react"
import ReactMarkdown from "react-markdown"
import SyntaxHighlighter from "react-syntax-highlighter"
import { androidstudio } from "react-syntax-highlighter/dist/esm/styles/hljs"
import gfm from "remark-gfm"

export function ChatMessageBubble(props: {
  message: Message
  aiEmoji?: string
}) {
  const colorClassName =
    props.message.role === "user" ? "bg-white text-black" : "bg-red text-white"
  const alignmentClassName =
    props.message.role === "user" ? "ml-auto" : "mr-auto"
  const prefix = props.message.role === "user" ? "" : props.aiEmoji

  return (
    <div
      className={`${alignmentClassName} ${colorClassName} mb-8 flex max-w-[80%] rounded-4xl px-4 py-2`}
    >
      <div className="mr-2">{prefix}</div>
      <div className="whitespace-pre-wrap">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "")

              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  PreTag="div"
                  {...props}
                  style={androidstudio}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
          remarkPlugins={[gfm]}
        >
          {props.message.content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
