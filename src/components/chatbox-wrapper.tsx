import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Email } from "@/lib/types";
import { AIAnalysisChat } from "./chat";

interface ChatboxWrapperProps {
    children: React.ReactNode;
    selectedEmails: Email[];
    currentChatOpen: boolean;
    setCurrentChatOpen: (chatOpen: boolean) => void;
    setSelectedEmails: (selectedEmails: Email[]) => void;
    handleOpenSheet: (email: Email) => void;
}

export const ChatboxWrapper = ({ children, ...props }: ChatboxWrapperProps) => {
    const [chatOpen, setChatOpen] = useState(props.currentChatOpen);

    //when the chatOpen state changes, bubble it up to the parent
    useEffect(() => {
        props.setCurrentChatOpen(chatOpen);
    }, [chatOpen]);

    return (
        <>
            <div className="flex flex-row relative w-full">
                <div className={`border transition-all duration-300 ease-in-out ${chatOpen ? 'scale-95 overflow-scroll h-[90vh] w-2/3 shadow-lg rounded-lg' : ' w-full'}`}>
                    <div id="board" className={`min-h-screen w-full  min-w-[1100px] relative`}>
                        {children}
                    </div>
                </div>
                { /* AI Chat*/}
                <div className={`border rounded-lg shadow-lg transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-right-1/2 ${chatOpen ? 'scale-95 overflow-scroll h-[90vh] w-1/3 block' : 'scale-100 hidden w-0'}`}>
                    <AIAnalysisChat 
                        selectedEmails={props.selectedEmails}
                        groups={[]}
                        handleOpenSheet={props.handleOpenSheet}
                    />
                </div>
            </div>

            { /* Ask AI */}
            <div className="fixed bottom-4 left-0 right-0 z-[100] pointer-events-none">
                <div className="flex justify-center pointer-events-auto">
                    <div className="shadow-xl flex flex-row items-center gap-0 rounded-md transition-all duration-300 ease-in-out bg-transparent backdrop-blur-sm">
                        {
                            !chatOpen ? (
                                <Button
                                    onClick={() => {
                                        setChatOpen(true);
                                    }}
                                    variant="outline" className="bg-primary border-primary text-primary-foreground hover:text-white hover:bg-primary/90 font-semibold" size="default">
                                    <Sparkles className="w-4 h-4 mr-1" />
                                    Ask AI</Button>
                            )
                                : (
                                    <Button
                                        onClick={() => {
                                            setChatOpen(false);
                                            props.setSelectedEmails([]);
                                        }}
                                        variant="outline" className="bg-primary border-primary text-primary-foreground hover:text-white hover:bg-primary/90 font-semibold" size="default">
                                        <X className="w-4 h-4 mr-1" />
                                        Cancel</Button>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};