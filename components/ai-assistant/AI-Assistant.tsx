'use client'

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    X,
    MessageCircle,
    Send,
    Loader2,
    ArrowDownCircleIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '@ai-sdk/react'


export default function Chat() {

    const [isChatOpen, setIsChatOpen] = useState(false)
    const [showChatIcon, setShowChatIcon] = useState(false)
    const [selectedApi, setSelectedApi] = useState("api/openai");

    const chatIconRef = useRef<HTMLButtonElement>(null)
    const preRef = useRef<HTMLPreElement>(null);

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        stop,
        reload,
        error
    } = useChat({ api: selectedApi });

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowChatIcon(true)
            } else {
                setShowChatIcon(false)
                setIsChatOpen(false)
            }
        }

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    }, []);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    }

    // const toggleApi = () => {
    //     setSelectedApi((prevApi) => (prevApi === "api/openai" ? "api/gemini" : "api/openai"));
    // };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messages])

    return (
        <div className="bg-black">
            <AnimatePresence>
                {showChatIcon && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-4 right-4 z-50"
                    >
                        <Button
                            ref={chatIconRef}
                            onClick={toggleChat}
                            size="icon"
                            className="rounded-full size-14 p-2 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500"
                        >
                            {isChatOpen ? (
                                <ArrowDownCircleIcon className="size-12" />
                            ) : (
                                <MessageCircle className="size-12" />
                            )}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-20 right-2 md:right-4 z-50 w-[95%] md:w-[500px]"
                    >
                        <Card className="bg-gradient-to-r from-indigo-500 to-purple-500">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                <CardTitle className="text-lg">
                                    My AI assistant
                                </CardTitle>
                                <Button
                                    onClick={toggleChat}
                                    size="sm"
                                    variant="ghost"
                                    className="px-2 py-0"
                                >
                                    <X className="size-4" />
                                    <span className="sr-only">Close chat</span>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px] pr-4">
                                    {messages?.length === 0 && (
                                        <div className="w-full mt-32 text-gray-600 items-center justify-center flex gap-3">
                                            No messages yet
                                        </div>
                                    )}
                                    {messages?.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                                        >
                                            <div className={`inline-block p-3 rounded-lg ${message.role === "user" ? "bg-black bg-opacity-50 text-white" : "bg-black bg-opacity-20 text-white"}`}
                                            >
                                                <ReactMarkdown
                                                    children={message.content}
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        code: ({ node, className, children, ...props }) => {
                                                            // If the className contains a specific identifier (like "inline"), treat it as inline.
                                                            const isInline = className?.includes('inline'); // You can adjust the condition based on your setup

                                                            return isInline ? (
                                                                <code
                                                                    {...props}
                                                                    className="bg-gray-200 px-1 rounded"
                                                                >
                                                                    {children}
                                                                </code>
                                                            ) : (
                                                                <pre
                                                                    ref={preRef}
                                                                    className="bg-gray-200 p-2 rounded"
                                                                >
                                                                    <code>{children}</code>
                                                                </pre>
                                                            );
                                                        },
                                                        ul: ({ children }) => (
                                                            <ul className="list-disc ml-4">{children}</ul>
                                                        ),
                                                        ol: ({ children }) => (
                                                            <ol className="list-decimal ml-4">{children}</ol>
                                                        ),

                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="w-full items-center flex justify-center gap-3">
                                            <Loader2 className="animate-spin h-5 w-5 text-primary" />
                                            <button
                                                className="underline"
                                                type="button"
                                                onClick={() => stop()}
                                            >
                                                abort
                                            </button>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="w-full items-center flex justify-center gap-3">
                                            <div>An error occurred.</div>
                                            <button
                                                className="underline"
                                                type="button"
                                                onClick={() => reload()}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}
                                    <div ref={scrollRef}></div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="flex flex-col">
                                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                                    <Input
                                        value={input}
                                        onChange={handleInputChange}
                                        className="flex-1 bg-white"
                                        placeholder="Type your message here..."
                                    />
                                    <Button
                                        type="submit"
                                        className="size-9"
                                        disabled={isLoading}
                                        size="icon"
                                    >
                                        <Send className="size-4" />
                                    </Button>
                                </form>
                                {/* <div className="flex justify-center items-center gap-4">
                                    <p className="text-sm pt-2">Toggle to switch AI</p>
                                    <Button
                                        onClick={toggleApi}
                                        className="mt-2"
                                    >
                                    {selectedApi === "api/openai" ? "OpenAI" : "Gemini"}
                                    </Button>
                                </div> */}
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
