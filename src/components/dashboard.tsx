import { Email } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import { TrendingUp, Mail, BarChart3, Calendar, Zap } from "lucide-react";
import { createSwapy } from 'swapy'
import type { Swapy } from 'swapy'
import { Card } from "@/components/ui/card";

export function DashboardView({ selectedEmails }: { selectedEmails: Email[] }) {
    const [isVisible, setIsVisible] = useState(false);
    const swapy = useRef<Swapy | null>(null)
    const container = useRef(null)


    useEffect(() => {
        if (!container.current) {
            return
        }
        // If container element is loaded
        if (container.current) {
            swapy.current = createSwapy(container.current)

            // Your event listeners
            swapy.current.onSwap((event) => {
                console.log('swap', event);
            })
        }

        return () => {
            // Destroy the swapy instance on component destroy
            swapy.current?.destroy()
        }
    }, [])

    useEffect(() => {
        setIsVisible(true);
    }, []);



    if (selectedEmails.length === 0) {
        return (
            <div className={`p-4 sm:p-8 h-full flex items-center justify-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-center max-w-sm">
                    <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">Email Analytics Dashboard</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Select some emails to view analytics and insights</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={container} className={`p-4 overflow-y-auto scale-[1.053] origin-top-left ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-3 gap-4 h-full mr-10">
                <div data-swapy-slot="slot-1" className="aspect-square">
                    <Card data-swapy-item="card-1" className="w-full h-full p-4 flex items-center justify-center">
                        <div className="text-center">
                            <Mail className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                            <h3 className="font-semibold">Total Emails</h3>
                            <p className="text-2xl font-bold">{selectedEmails.length}</p>
                        </div>
                    </Card>
                </div>

                

                <div data-swapy-slot="slot-3" className="aspect-square">
                    <Card data-swapy-item="card-3" className="w-full h-full p-4 flex items-center justify-center">
                        <div className="text-center">
                            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                            <h3 className="font-semibold">Avg Response Time</h3>
                            <p className="text-2xl font-bold">2.4h</p>
                        </div>
                    </Card>
                </div>

                <div data-swapy-slot="slot-4" className="aspect-square">
                    <Card data-swapy-item="card-4" className="w-full h-full p-4 flex items-center justify-center">
                        <div className="text-center">
                            <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                            <h3 className="font-semibold">This Week</h3>
                            <p className="text-2xl font-bold">{selectedEmails.filter(e => new Date(e.sentTime) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}</p>
                        </div>
                    </Card>
                </div>

                <div data-swapy-slot="slot-7" className="aspect-square">
                    <Card data-swapy-item="card-7" className="w-full h-full p-4 flex items-center justify-center">
                        <div className="text-center">
                            <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                            <h3 className="font-semibold">Quick Actions</h3>
                            <p className="text-2xl font-bold">12</p>
                        </div>
                    </Card>
                </div>


            </div>
        </div>
    );
}