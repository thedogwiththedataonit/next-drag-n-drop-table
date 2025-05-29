import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X, Table, BarChart3 } from "lucide-react";
import { Email } from "@/lib/types";
import { AIAnalysisChat } from "./chat";
import { DashboardView } from "./dashboard";

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
    const [view, setView] = useState<'table' | 'dashboard'>('table');
    const [resetChatKey, setResetChatKey] = useState(0);

    //when the chatOpen state changes, bubble it up to the parent
    useEffect(() => {
        props.setCurrentChatOpen(chatOpen);
    }, [chatOpen]);

    return (
        <>
            <div className="flex flex-row relative w-full">
                {/* Tab buttons - positioned outside the scrollable container */}
                {chatOpen && (
                    <div className="absolute -top-3.5 left-[24.5px] z-10 animate-in fade-in-0 slide-in-from-bottom duration-500">
                        <div className="flex flex-row justify-start items-end">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`bg-background border border-border border-b-0 text-foreground hover:text-foreground hover:bg-primary/20 font-medium rounded-b-none rounded-t-lg px-4 py-1 h-8 shadow-sm ${view === 'table' ? 'bg-primary text-primary-foreground hover:bg-primary/60 hover:text-primary-foreground' : ''}`}
                                onClick={() => setView('table')}
                            >
                                <Table className="w-4 h-4 mr-2" />
                                Table
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className={`bg-background border border-border border-b-0 text-muted-foreground hover:text-foreground hover:bg-primary/20 font-medium rounded-b-none rounded-t-lg px-4 py-1 h-8 shadow-sm ml-1 ${view === 'dashboard' ? 'bg-primary text-primary-foreground hover:bg-primary/60 hover:text-primary-foreground' : ''}`}
                                onClick={() => setView('dashboard')}
                            >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                Dashboard
                            </Button>
                        </div>
                    </div>
                )}

                <div className={`border transition-all duration-300 z-20 ease-in-out relative ${chatOpen ? 'scale-95 overflow-scroll h-[90vh] w-2/3 shadow-lg rounded-lg rounded-tl-none' : ' w-full'}`}>
                    {view === 'table' ? (
                        <div id="board" className={`min-h-screen w-full  min-w-[1100px] relative`}>
                            {children}
                        </div>
                    ) : (
                        <DashboardView selectedEmails={props.selectedEmails} />
                    )}

                </div>
                { /* AI Chat*/}
                <div className={`border rounded-lg shadow-lg transition-all duration-300 ease-in-out animate-in fade-in-0 slide-in-from-right-1/2 ${chatOpen ? 'scale-95 overflow-scroll h-[90vh] w-1/3 block' : 'scale-100 hidden w-0'}`}>
                    <AIAnalysisChat
                        key={resetChatKey}
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
                                        setView('table');
                                        props.setSelectedEmails([]);
                                        setResetChatKey(prev => prev + 1);
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

