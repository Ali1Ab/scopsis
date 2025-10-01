'use client'
import { useState, useRef, useEffect } from 'react'
import Lottie from 'lottie-react'
import chatbot from './chatbot.json'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! What can I help you with?' }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(true)
    const chatRef = useRef<HTMLDivElement>(null)

    const suggestions = [
        'What services does SCOPSIS offer?',
        'What are SCOPSIS\'s initiatives for 2025?',
        'How can I contact SCOPSIS?'
    ]

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [messages, loading])

    const sendMessage = async (messageText?: string) => {
        const textToSend = messageText || input
        if (!textToSend.trim()) return

        const newMessages = [...messages, { role: 'user', content: textToSend }]
        setMessages(newMessages)
        setInput('')
        setLoading(true)
        setShowSuggestions(false)

        try {
            const res = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: textToSend })
            })

            const data = await res.json()
            setMessages([...newMessages, { role: 'assistant', content: data.message }])
        } catch {
            setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }])
        } finally {
            setLoading(false)
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        sendMessage(suggestion)
    }

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {open ? (
                <div className="flex flex-col items-end animate-slide-up">
                    <div className="w-full cursor-pointer sm:w-96 sm:h-[90vh] h-[80vh] bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

                        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-500 to-purple-600">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 cursor-pointer bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <Lottie animationData={chatbot} loop={true} className="w-8 h-8" />
                                </div>
                                <div>
                                    <span className="text-base font-bold text-white block">Scopsis Assistant</span>
                                    <span className="text-xs text-white/80">Always here to help</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-white/80 hover:text-white transition-all p-2 hover:bg-white/20 rounded-lg hover:rotate-90 duration-200"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div
                            ref={chatRef}
                            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-blue-50/50 to-purple-50/30 dark:from-gray-900 dark:to-gray-800"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#a855f7 transparent'
                            }}
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0 shadow-lg">
                                            <Lottie animationData={chatbot} loop={true} className="w-6 h-6" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm shadow-lg ${msg.role === 'user'
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                                        : 'bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-700 text-gray-800 dark:text-gray-100 rounded-tl-md shadow-blue-200 dark:shadow-blue-900'
                                        }`}>
                                        <div className="markdown-content">
                                            <Markdown remarkPlugins={[remarkGfm]}>
                                                {msg.content}
                                            </Markdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start animate-fade-in">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0 shadow-lg">
                                        <Lottie animationData={chatbot} loop={true} className="w-6 h-6" />
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-700 rounded-2xl rounded-tl-md px-5 py-3 shadow-lg">
                                        <span className="sr-only">Assistant is typing…</span>
                                        <span className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2.5 h-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="border-t-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900">
                            <div className="flex items-center gap-3 px-4 py-4">
                                <input
                                    className="flex-1 border-2 border-blue-200 dark:border-blue-800 rounded-full px-5 py-2.5 text-sm outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all shadow-sm"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
                                    placeholder="Type your message..."
                                    disabled={loading}
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={loading || !input.trim()}
                                    aria-busy={loading}
                                    className="w-11 h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
                                >
                                    {loading ? (
                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    )}
                                </button>
                            </div>


                            {showSuggestions && (
                                <div className="px-4 pb-4 flex flex-wrap gap-2 animate-fade-in">
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="text-xs px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-blue-300 dark:border-blue-700 rounded-full hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-md transition-all text-gray-700 dark:text-gray-200 font-medium"
                                        >
                                            💡 {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <button
                        onClick={() => setOpen(false)}
                        className="mt-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group animate-pulse hover:animate-none"
                >
                    <Lottie animationData={chatbot} loop={true} className="w-12 h-12 group-hover:scale-110 transition-transform" />
                </button>
            )}
        </div>
    )
}