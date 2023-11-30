import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useChat } from "ai/react"
import type { FormEvent } from "react"
import { ReactElement, useRef, useState } from "react"

import { ChatMessageBubble } from "@/components/ChatMessageBubble"

export function ChatWindow(props: {
  endpoint: string
  placeholder?: string
  emptyStateComponent: ReactElement
}) {
  const messageContainerRef = useRef<HTMLDivElement | null>(null)
  const [aiResponding, setAiResponding] = useState(false)

  const { endpoint, emptyStateComponent, placeholder } = props

  const { messages, input, setInput, handleInputChange, setMessages } = useChat(
    {
      api: endpoint,
      initialMessages: [
        {
          id: "0",
          content:
            "Welcome to here! Here, you can fully experience the charm of K-pop culture. If you have any questions, feel free to ask. We're here to assist you on your K-pop journey!",
          role: "assistant",
        },
      ],
      onError: (e: any) => {
        toast(e.message, {
          theme: "dark",
        })
      },
    },
  )

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Modify input if it contains specific keywords
    // Modify input if it contains specific keywords
    const keywords = ["bts", "방탄", "방탄소년단", "방탄 소년단"]
    let modifiedInput = input

    // Regular expression to match keywords followed by a space or end of string
    const keywordsRegex = new RegExp(keywords.join("|"), "gi")

    // Replace matched keywords with the keyword itself followed by " army"
    modifiedInput = modifiedInput.replace(
      keywordsRegex,
      (matched) => `${matched} army`,
    )

    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("grow")
    }

    if (!messages.length) {
      await new Promise((resolve) => setTimeout(resolve, 300))
    }

    setInput("")
    const messagesWithUserReply = messages.concat({
      id: messages.length.toString(),
      content: input, // Use the modified input
      role: "user",
    })

    setMessages(messagesWithUserReply)

    try {
      setAiResponding(true)

      const response = await axios.post(endpoint, {
        question: modifiedInput,
      })
      const json = response.data

      if (response.status >= 200 && response.status < 300) {
        const newMessages = messagesWithUserReply

        setMessages([
          ...newMessages,
          {
            id: newMessages.length.toString(),
            content: json.answer,
            role: "assistant",
          },
        ])
        setAiResponding(false)
      }
    } catch (error: any) {
      if (error.response && error.response.data.error) {
        toast(error.response.data.error, {
          theme: "dark",
        })
        throw new Error(error.response.data.error)
      }
    }
  }

  return (
    <div
      className={`flex grow flex-col items-center justify-between overflow-hidden rounded-4xl border border-stone-500 p-4 md:p-8 ${
        messages.length > 0 ? "border border-stone-500" : ""
      }`}
    >
      {messages.length === 0 ? emptyStateComponent : ""}

      <div
        className="scroll-container mb-4 flex w-full flex-col-reverse overflow-auto p-2 transition-[flex-grow] ease-in-out"
        ref={messageContainerRef}
      >
        {messages.length > 0
          ? [...messages]
              .reverse()
              .map((m) => (
                <ChatMessageBubble key={m.id} message={m}></ChatMessageBubble>
              ))
          : ""}
      </div>

      <form onSubmit={sendMessage} className="flex w-full flex-col">
        <div className="mt-4 flex w-full items-center justify-center">
          <input
            className="mr-4 grow rounded-md border border-stone-500 bg-white p-4 text-black md:mr-8  md:rounded-4xl lg:mr-8 "
            value={input}
            placeholder={placeholder ?? "What's it like to be a pirate?"}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className=" flex shrink-0 items-center justify-center rounded-md border bg-red px-6 py-4 md:w-28 md:rounded-4xl"
          >
            <div
              role="status"
              className={`${aiResponding ? "" : "hidden"} flex justify-center`}
            >
              <svg
                aria-hidden="true"
                className="h-6 w-6 animate-spin fill-sky-800 text-white dark:text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            <span className={aiResponding ? "hidden" : ""}>Send</span>
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  )
}
