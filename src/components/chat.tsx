"use client"

import React, { useState, useEffect, useRef } from "react"
import { Send, X, RefreshCcw, Copy, Share2, ThumbsUp, ThumbsDown, ChevronLeft, Mail, Plus, Minus, Users, MessageSquare, Clock, ChevronRight, Search, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Email } from "@/lib/types"

// Types for chat components
type MessageType = "user" | "system"

export interface Chat {
    id: string
    name: string
    emails: number
    lastMessage: string
    lastMessageTimestamp: string
    messages: ChatMessage[]
}

export interface ChatMessage {
    id: string
    content: string
    type: MessageType
    completed?: boolean
    newSection?: boolean
    isSelection?: boolean
    selectionAction?: 'added' | 'removed'
    emailData?: Email
    timestamp: string
}

export interface MessageSection {
    id: string
    messages: ChatMessage[]
    isNewSection: boolean
    isActive?: boolean
    sectionIndex: number
}

interface StreamingWord {
    id: number
    text: string
}

// Types for the data being analyzed
export interface Item {
    id: string
    name: string
    email: string
    location: string
    status: string
    balance: string
    groupId?: string
}

export interface Group {
    id: string
    name: string
    isExpanded: boolean
    items: Item[]
}

// Constants for chat animation
const WORD_DELAY = 40 // ms per word
const CHUNK_SIZE = 2 // Number of words to add at once

// Dummy chat data
const DUMMY_CHATS: Chat[] = [
    {
        id: "chat-1",
        name: "Marketing Team Analysis",
        emails: 15,
        lastMessage: "The marketing team emails show high engagement rates...",
        lastMessageTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        messages: []
    },
    {
        id: "chat-2", 
        name: "Customer Support Review",
        emails: 8,
        lastMessage: "Most support tickets are resolved within 24 hours...",
        lastMessageTimestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        messages: []
    },
    {
        id: "chat-3",
        name: "Sales Pipeline Analysis", 
        emails: 23,
        lastMessage: "Q4 sales emails indicate strong pipeline growth...",
        lastMessageTimestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        messages: []
    },
    {
        id: "chat-4",
        name: "Executive Communications",
        emails: 6,
        lastMessage: "Board meeting preparations are on track...",
        lastMessageTimestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        messages: []
    },
    {
        id: "chat-5",
        name: "Project Updates",
        emails: 12,
        lastMessage: "Development milestones are being met consistently...",
        lastMessageTimestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        messages: []
    },
    {
        id: "chat-6",
        name: "Client Onboarding",
        emails: 9,
        lastMessage: "New client integration process is streamlined...",
        lastMessageTimestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
        messages: []
    },
    {
        id: "chat-7",
        name: "HR Policy Review",
        emails: 4,
        lastMessage: "Updated policies show improved compliance...",
        lastMessageTimestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        messages: []
    }
]

interface AIAnalysisChatProps {
    selectedEmails: Email[]
    groups: Group[]
    handleOpenSheet: (email: Email) => void
}

export function AIAnalysisChat({
    selectedEmails,
    groups,
    handleOpenSheet,
}: AIAnalysisChatProps) {
    // View state
    const [currentView, setCurrentView] = useState<'chat' | 'history'>('chat')
    const [isTransitioning, setIsTransitioning] = useState(false)
    
    // Chat history state
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredChats, setFilteredChats] = useState<Chat[]>(DUMMY_CHATS)

    // Chat state
    const [inputValue, setInputValue] = useState("")
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "initial-message",
            content: "Hi there! I can help analyze the emails you've selected. What would you like to know about them? I can see you've selected " + selectedEmails.length + " emails. What would you like to know about them?",
            type: "system",
            completed: true,
            timestamp: new Date().toISOString()
        }
    ])
    const [messageSections, setMessageSections] = useState<MessageSection[]>([])
    const [isStreaming, setIsStreaming] = useState(false)
    const [streamingWords, setStreamingWords] = useState<StreamingWord[]>([])
    const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
    const [completedMessages, setCompletedMessages] = useState<Set<string>>(new Set(["initial-message"]))
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

    // Refs
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const latestUserMessageRef = useRef<HTMLDivElement>(null)
    const previousSelectedEmailsRef = useRef<Email[]>([])
    const inputRef = useRef<HTMLInputElement>(null)

    // Filter chats based on search query
    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = DUMMY_CHATS.filter(chat => 
                chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
            )
            setFilteredChats(filtered)
        } else {
            setFilteredChats(DUMMY_CHATS)
        }
    }, [searchQuery])

    // Handle view transition
    const handleViewChange = async (newView: 'chat' | 'history') => {
        if (isTransitioning || currentView === newView) return
        
        setIsTransitioning(true)
        
        // Wait for animation to complete
        setTimeout(() => {
            setCurrentView(newView)
            setIsTransitioning(false)
        }, 300)
    }

    // Handle chat selection from history
    const handleChatSelect = (chat: Chat) => {
        // You could load the selected chat's messages here
        console.log("Selected chat:", chat)
        handleViewChange('chat')
    }

    // Format timestamp for chat history
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
        
        if (diffInHours < 1) return "Just now"
        if (diffInHours < 24) return `${diffInHours}h ago`
        
        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) return `${diffInDays}d ago`
        
        const diffInWeeks = Math.floor(diffInDays / 7)
        return `${diffInWeeks}w ago`
    }

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [messages])

    // Organize messages into sections
    useEffect(() => {
        if (messages.length === 0) {
            setMessageSections([])
            setActiveSectionId(null)
            return
        }

        const sections: MessageSection[] = []
        let currentSection: MessageSection = {
            id: `section-${Date.now()}-0`,
            messages: [],
            isNewSection: false,
            sectionIndex: 0,
        }

        messages.forEach((message) => {
            if (message.newSection) {
                // Start a new section
                if (currentSection.messages.length > 0) {
                    // Mark previous section as inactive
                    sections.push({
                        ...currentSection,
                        isActive: false,
                    })
                }

                // Create new active section
                const newSectionId = `section-${Date.now()}-${sections.length}`
                currentSection = {
                    id: newSectionId,
                    messages: [message],
                    isNewSection: true,
                    isActive: true,
                    sectionIndex: sections.length,
                }

                // Update active section ID
                setActiveSectionId(newSectionId)
            } else {
                // Add to current section
                currentSection.messages.push(message)
            }
        })

        // Add the last section if it has messages
        if (currentSection.messages.length > 0) {
            sections.push(currentSection)
        }

        setMessageSections(sections)
    }, [messages])

    // Scroll to bottom when new messages are added
    useEffect(() => {
        if (messageSections.length > 0 && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messageSections])

    // Add event listener for focus-chat event
    useEffect(() => {
        const handleFocusEvent = (e: CustomEvent<{ selectedCount: number }>) => {
            // Add visual feedback when chat is focused via "Analyze emails" button
            if (chatContainerRef.current) {
                // Add and remove a highlight class for animation effect
                chatContainerRef.current.classList.add('highlight-animation');

                // Maybe add a message about analyzing the selected emails
                if (e.detail.selectedCount > 0) {
                    // Only add this message if the last message isn't about analyzing emails
                    const lastMessage = messages[messages.length - 1];
                    if (!lastMessage || !lastMessage.content.includes(`analyzing the ${e.detail.selectedCount} emails`)) {
                        const defaultPrompt = `I'd like to analyze these ${e.detail.selectedCount} emails.`;
                        setInputValue(defaultPrompt);
                        // Optionally auto-submit this message
                        // setTimeout(() => handleSubmit(), 100);
                    }
                }

                // Remove the animation class after animation completes
                setTimeout(() => {
                    if (chatContainerRef.current) {
                        chatContainerRef.current.classList.remove('highlight-animation');
                    }
                }, 1500);
            }
        };

        // Type assertion for the event listener
        const listener = handleFocusEvent as EventListener;
        document.addEventListener('focus-chat', listener);

        return () => {
            document.removeEventListener('focus-chat', listener);
        };
    }, [messages]);

    // Update initial message when selectedRows changes
    useEffect(() => {
        const previousEmails = previousSelectedEmailsRef.current;
        const currentEmails = selectedEmails;

        // Only update if we have the initial message
        if (messages.length > 0 && messages[0].id === "initial-message") {
            const initialMessage = {
                id: "initial-message",
                content: selectedEmails.length > 0
                    ? `Hi there! I can help analyze the ${selectedEmails.length} email${selectedEmails.length !== 1 ? 's' : ''} you've selected. What would you like to know about ${selectedEmails.length === 1 ? 'it' : 'them'}?`
                    : "Hi there! Select some emails and I can help analyze them. What would you like to know?",
                type: "system" as MessageType,
                completed: true,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [initialMessage, ...prev.slice(1)]);
        }

        // Skip processing on initial load
        if (previousEmails.length === 0 && currentEmails.length === 0) {
            previousSelectedEmailsRef.current = currentEmails;
            return;
        }

        // Find added emails
        const addedEmails = currentEmails.filter(email =>
            !previousEmails.some(prevEmail => prevEmail.id === email.id)
        );

        // Find removed emails
        const removedEmails = previousEmails.filter(prevEmail =>
            !currentEmails.some(email => email.id === prevEmail.id)
        );

        // Create messages for added emails
        addedEmails.forEach(email => {
            const selectionMessage: ChatMessage = {
                id: `selection-added-${email.id}-${Date.now()}`,
                content: `${email.name} added`,
                type: "system",
                completed: true,
                isSelection: true,
                selectionAction: 'added',
                emailData: email,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, selectionMessage]);
        });

        // Create messages for removed emails
        removedEmails.forEach(email => {
            const selectionMessage: ChatMessage = {
                id: `selection-removed-${email.id}-${Date.now()}`,
                content: `${email.name} removed`,
                type: "system",
                completed: true,
                isSelection: true,
                selectionAction: 'removed',
                emailData: email,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, selectionMessage]);
        });

        // Update the ref with current emails
        previousSelectedEmailsRef.current = currentEmails;

    }, [selectedEmails]);

    // Text streaming simulation
    const simulateTextStreaming = async (text: string) => {
        // Split text into words
        const words = text.split(" ")
        let currentIndex = 0
        setStreamingWords([])
        setIsStreaming(true)

        return new Promise<void>((resolve) => {
            const streamInterval = setInterval(() => {
                if (currentIndex < words.length) {
                    // Add a few words at a time
                    const nextIndex = Math.min(currentIndex + CHUNK_SIZE, words.length)
                    const newWords = words.slice(currentIndex, nextIndex)

                    setStreamingWords((prev) => [
                        ...prev,
                        {
                            id: Date.now() + currentIndex,
                            text: newWords.join(" ") + " ",
                        },
                    ])

                    currentIndex = nextIndex
                } else {
                    clearInterval(streamInterval)
                    resolve()
                }
            }, WORD_DELAY)
        })
    }

    // Helper functions to generate insights from selected emails
    const getRegionBreakdown = () => {
        const regions = new Set<string>();
        groups.forEach(group => {
            group.items.forEach(item => {
                if (selectedEmails.map(email => email.id).includes(item.id)) {
                    regions.add(group.name);
                }
            });
        });
        return Array.from(regions).join(", ");
    }

    const getSelectedGroupCount = () => {
        const selectedGroups = new Set<string>();
        groups.forEach(group => {
            group.items.forEach(item => {
                if (selectedEmails.map(email => email.id).includes(item.id)) {
                    selectedGroups.add(group.id);
                }
            });
        });
        return selectedGroups.size;
    }

    const getActiveStatusBreakdown = () => {
        let activeCount = 0;
        let inactiveCount = 0;
        let total = 0;

        groups.forEach(group => {
            group.items.forEach(item => {
                if (selectedEmails.map(email => email.id).includes(item.id)) {
                    total++;
                    if (item.status === "Active") {
                        activeCount++;
                    } else {
                        inactiveCount++;
                    }
                }
            });
        });

        if (total === 0) return "no emails";

        return `${activeCount} active and ${inactiveCount} inactive emails`;
    }

    const getTotalBalance = () => {
        let total = 0;

        groups.forEach(group => {
            group.items.forEach(item => {
                if (selectedEmails.map(email => email.id).includes(item.id)) {
                    const balanceValue = Number.parseFloat(item.balance.replace(/[^0-9.-]+/g, ""));
                    if (!isNaN(balanceValue)) {
                        total += balanceValue;
                    }
                }
            });
        });

        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
    }

    const getHighestBalance = () => {
        let highest = -Infinity;

        groups.forEach(group => {
            group.items.forEach(item => {
                if (selectedEmails.map(email => email.id).includes(item.id)) {
                    const balanceValue = Number.parseFloat(item.balance.replace(/[^0-9.-]+/g, ""));
                    if (!isNaN(balanceValue) && balanceValue > highest) {
                        highest = balanceValue;
                    }
                }
            });
        });

        if (highest === -Infinity) return "$0.00";

        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(highest);
    }

    // Generate AI response based on selected emails
    const getAIResponse = (userMessage: string) => {
        const selectedCount = selectedEmails.length;

        // Generate a response that mentions the selected emails
        if (userMessage.toLowerCase().includes("summarize") || userMessage.toLowerCase().includes("summary")) {
            return `I've analyzed the ${selectedCount} emails you selected. These emails are primarily from ${getRegionBreakdown()}. The majority are in ${getActiveStatusBreakdown()} status, with a combined balance of approximately ${getTotalBalance()}.`;
        } else if (userMessage.toLowerCase().includes("location") || userMessage.toLowerCase().includes("region")) {
            return `The ${selectedCount} emails you selected come from various regions: ${getRegionBreakdown()}. Would you like more specific information about any particular region?`;
        } else if (userMessage.toLowerCase().includes("active") || userMessage.toLowerCase().includes("status")) {
            return `Among the ${selectedCount} selected emails, ${getActiveStatusBreakdown()}. Would you like to focus on just the active or inactive ones?`;
        } else if (userMessage.toLowerCase().includes("balance") || userMessage.toLowerCase().includes("amount")) {
            return `The total balance for all ${selectedCount} selected emails is ${getTotalBalance()}. The highest individual balance is ${getHighestBalance()}.`;
        }

        // Default response
        return `I'm analyzing the ${selectedCount} emails you've selected. These are spread across ${getSelectedGroupCount()} different regions with varying statuses. What specific insights would you like about these emails?`;
    }

    // Handle AI response generation
    const simulateAIResponse = async (userMessage: string) => {
        const response = getAIResponse(userMessage);

        // Create a new message with empty content
        const messageId = Date.now().toString();
        setStreamingMessageId(messageId);

        setMessages((prev) => [
            ...prev,
            {
                id: messageId,
                content: "",
                type: "system",
                timestamp: new Date().toISOString()
            },
        ]);

        // Stream the text
        await simulateTextStreaming(response);

        // Update with complete message
        setMessages((prev) =>
            prev.map((msg) => (msg.id === messageId ? { ...msg, content: response, completed: true } : msg)),
        );

        // Add to completed messages set
        setCompletedMessages((prev) => new Set(prev).add(messageId));

        // Reset streaming state
        setStreamingWords([]);
        setStreamingMessageId(null);
        setIsStreaming(false);

        // Refocus the input after the AI response is completed
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    // Handle chat form submission
    const handleSubmit = () => {
        if (inputValue.trim() && !isStreaming) {
            const userMessage = inputValue.trim();

            // Add as a new section if messages already exist
            const shouldAddNewSection = messages.length > 0;

            const newUserMessage = {
                id: `user-${Date.now()}`,
                content: userMessage,
                type: "user" as MessageType,
                newSection: shouldAddNewSection,
                timestamp: new Date().toISOString()
            };

            // Reset input before starting the AI response
            setInputValue("");

            // Add the message after resetting input
            setMessages((prev) => [...prev, newUserMessage]);

            // Start AI response
            simulateAIResponse(userMessage);
        }
    }

    // Render a chat message
    const renderMessage = (message: ChatMessage, isLatestUserMessage = false) => {
        const isCompleted = completedMessages.has(message.id);

        // Special rendering for selection messages
        if (message.isSelection) {
            return (
                <div
                    onClick={() => handleOpenSheet(message.emailData as Email)}
                    key={message.id}
                    className="flex flex-col mb-2"
                >
                    <div
                        className={cn(
                            "px-3 py-2 rounded-md text-sm flex items-center gap-2 max-w-[85%]",
                            message.selectionAction === 'added'
                                ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300 border border-green-200 dark:border-green-800"
                                : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300 border border-red-200 dark:border-red-800"
                        )}
                    >
                        {message.emailData?.type === 'Group' ? (
                            <Users className="h-4 w-4 flex-shrink-0" />
                        ) : (
                            <Mail className="h-4 w-4 flex-shrink-0" />
                        )}
                        {message.selectionAction === 'added' ? (
                            <Plus className="h-3 w-3 flex-shrink-0" />
                        ) : (
                            <Minus className="h-3 w-3 flex-shrink-0" />
                        )}
                        <span className="font-medium truncate">{message.content}</span>
                    </div>
                </div>
            );
        }

        return (
            <div
                key={message.id}
                ref={isLatestUserMessage ? latestUserMessageRef : null}
                className={cn("flex flex-col mb-4", message.type === "user" ? "items-end" : "items-start")}
            >
                <div
                    className={cn(
                        "max-w-[85%] px-4 py-3 rounded-xl text-sm",
                        message.type === "user"
                            ? "bg-accent/10 ml-auto rounded-tr-none"
                            : "bg-background/50 shadow-black/10 mr-auto rounded-tl-none"
                    )}
                >
                    {/* For user messages or completed system messages, render without animation */}
                    {message.content && (
                        <span className={message.type === "system" && !isCompleted ? "animate-fade-in" : ""}>
                            {message.content}
                        </span>
                    )}

                    {/* For streaming messages, render with animation */}
                    {message.id === streamingMessageId && (
                        <span className="inline">
                            {streamingWords.map((word) => (
                                <span key={word.id} className="animate-fade-in inline">
                                    {word.text}
                                </span>
                            ))}
                            <span className="animate-pulse inline-block ml-1">▋</span>
                        </span>
                    )}
                </div>

                {/* Message timestamp */}
                <div className="text-xs text-muted-foreground px-4 mb-2">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>

                {/* Message actions - only for system messages that are not selection messages */}
                {message.type === "system" && message.completed && !message.isSelection && (
                    <div className="flex items-center gap-2 px-4 mt-1 mb-2">
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <RefreshCcw className="h-4 w-4" />
                        </button>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Copy className="h-4 w-4" />
                        </button>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <Share2 className="h-4 w-4" />
                        </button>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <ThumbsDown className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // Chat History View Component
    const renderChatHistory = () => (
        <div className="w-full flex flex-col h-full shadow-lg overflow-hidden bg-background relative">
            {/* Chat History Header */}
            <div className="to-background border-b border-border/50 backdrop-blur-sm">
                <div className="p-4 pb-0">
                    <div className="flex items-center justify-between mb-3 animate-in fade-in-0 slide-in-from-right-2 duration-500">
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => handleViewChange('chat')}
                                className="p-2 hover:bg-background/50 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                            </button>
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <MessageSquare className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Chat History</h2>
                                <p className="text-xs text-muted-foreground">
                                    {filteredChats.length} conversation{filteredChats.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-border/50">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-grow overflow-y-auto">
                {filteredChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground">No conversations found</p>
                        <p className="text-sm text-muted-foreground/70">Try adjusting your search terms</p>
                    </div>
                ) : (
                    <div className="p-2">
                        {filteredChats.map((chat, index) => (
                            <div
                                key={chat.id}
                                onClick={() => handleChatSelect(chat)}
                                className={cn(
                                    "p-4 rounded-lg mb-2 cursor-pointer transition-all duration-200 hover:bg-muted/50 border border-transparent hover:border-border/50 group",
                                    "animate-in fade-in-0 slide-in-from-right-1 duration-300"
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                            <MessageSquare className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-foreground truncate">
                                                {chat.name}
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Mail className="h-3 w-3" />
                                                <span>{chat.emails} email{chat.emails !== 1 ? 's' : ''}</span>
                                                <span>•</span>
                                                <Clock className="h-3 w-3" />
                                                <span>{formatTimestamp(chat.lastMessageTimestamp)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2 ml-11">
                                    {chat.lastMessage}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    // Main Chat View Component  
    const renderMainChat = () => (
        <div className="w-full flex flex-col h-full shadow-lg overflow-hidden bg-background relative">

            {/* Beautiful Animated Header */}
            <div className="to-background border-b border-border/50 backdrop-blur-sm">
                <div className="p-4 pb-0">
                    {/* Top row with title and navigation */}
                    <div className="flex items-center justify-between mb-3 animate-in fade-in-0 slide-in-from-top-2 duration-500">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <MessageSquare className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Email Analysis Chat</h2>
                                <p className="text-xs text-muted-foreground">{/* First message timestamp */}
                                    {messages.length > 0 && (

                                        <span className="text-sm text-muted-foreground">
                                            Started {new Date(messages[0].timestamp).toLocaleString([], {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    )}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleViewChange('history')}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-lg transition-all duration-200 hover:shadow-sm"
                        >
                            All Chats
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                </div>
            </div>

            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto p-4"
            >
                {messageSections.map((section, sectionIndex) => {
                    // Find the latest user message in this section
                    const userMessageIndex = section.messages.findLastIndex((msg) => msg.type === "user");

                    return (
                        <div key={section.id}>
                            {section.messages.map((message, msgIndex) =>
                                renderMessage(
                                    message,
                                    // Is this the latest user message in the latest section?
                                    sectionIndex === messageSections.length - 1 && msgIndex === userMessageIndex,
                                )
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 pb-1 bg-background/50 backdrop-blur-sm pb-4">
                {/* Current Emails Summary */}
                {selectedEmails.length > 0 && (
                    <div className="mb-3 p-3 bg-muted/30 border border-border rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                            Currently selected ({selectedEmails.length}):
                        </div>
                        <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                            {selectedEmails.map((email) => (
                                <div
                                    onClick={() => handleOpenSheet(email)}
                                    key={email.id}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-background border border-border rounded text-xs"
                                >
                                    <Mail className="h-3 w-3 text-muted-foreground" />
                                    <span className="truncate max-w-[120px]" title={email.name}>
                                        {email.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        placeholder={isStreaming ? "AI is typing..." : "Ask about the selected emails..."}
                        disabled={isStreaming}
                        className={cn(
                            "flex-grow p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                            "border border-border bg-background",
                            isStreaming && "opacity-50"
                        )}
                        ref={inputRef}
                    />
                    <button
                        onClick={handleSubmit}
                        disabled={isStreaming || inputValue.trim() === ''}
                        className={cn(
                            "p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors",
                            "shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
                            (isStreaming || inputValue.trim() === '') && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>

            </div>
        </div>
    );


    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Chat View with Animation */}
            <div 
                className={cn(
                    "absolute inset-0 transition-all duration-300 ease-in-out",
                    currentView === 'chat' && !isTransitioning
                        ? "translate-x-0 opacity-100"
                        : "translate-x-[-100%] opacity-0"
                )}
            >
                {renderMainChat()}
            </div>

            {/* Chat History View with Animation */}
            <div 
                className={cn(
                    "absolute inset-0 transition-all duration-300 ease-in-out",
                    currentView === 'history' && !isTransitioning
                        ? "translate-x-0 opacity-100"
                        : "translate-x-[100%] opacity-0"
                )}
            >
                {renderChatHistory()}
            </div>
        </div>
    )
}

export default AIAnalysisChat;