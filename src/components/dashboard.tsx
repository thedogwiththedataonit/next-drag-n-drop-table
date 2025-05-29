import { Email } from "@/lib/types";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Users, Mail, BarChart3, PieChart as PieChartIcon, Calendar, Target, Activity, Zap } from "lucide-react";


interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: React.ReactNode;
    delay?: number;
}

interface ChartBarProps {
    label: string;
    value: number;
    maxValue: number;
    color: string;
    delay?: number;
}

interface LineChartProps {
    data: Array<{label: string, value: number}>;
    delay?: number;
}

interface DonutChartProps {
    data: Array<{label: string, value: number, color: string}>;
    delay?: number;
}

const MetricCard = ({ title, value, change, changeType, icon, delay = 0 }: MetricCardProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                        {icon}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate">{title}</p>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{value}</p>
                    </div>
                </div>
                <div className={`flex items-center text-xs sm:text-sm flex-shrink-0 ml-2 ${
                    changeType === 'increase' ? 'text-green-600' : 
                    changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
                }`}>
                    {changeType === 'increase' && <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />}
                    {changeType === 'decrease' && <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />}
                    <span className="hidden sm:inline">{change}</span>
                </div>
            </div>
        </div>
    );
};

const ChartBar = ({ label, value, maxValue, color, delay = 0 }: ChartBarProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="w-12 sm:w-20 text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-right truncate">{label}</div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 sm:h-4 relative overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
                    style={{ 
                        width: isVisible ? `${percentage}%` : '0%',
                        transitionDelay: `${delay}ms`
                    }}
                />
            </div>
            <div className="w-8 sm:w-16 text-xs sm:text-sm text-gray-600 dark:text-gray-400">{value}</div>
        </div>
    );
};

const PieChart = ({ data, delay = 0 }: { data: Array<{label: string, value: number, color: string}>, delay?: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    let cumulativePercentage = 0;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="relative">
                <svg width="100" height="100" className={`sm:w-[120px] sm:h-[120px] transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        className="dark:stroke-gray-700 sm:stroke-[10]"
                    />
                    {data.map((item, index) => {
                        const percentage = total > 0 ? (item.value / total) * 100 : 0;
                        const strokeDasharray = `${percentage * 2.51} 251`;
                        const strokeDashoffset = -cumulativePercentage * 2.51;
                        cumulativePercentage += percentage;
                        
                        return (
                            <circle
                                key={index}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke={item.color}
                                strokeWidth="8"
                                strokeDasharray={isVisible ? strokeDasharray : '0 251'}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-1000 ease-out sm:stroke-[10]"
                                style={{ 
                                    transformOrigin: '50px 50px',
                                    transform: 'rotate(-90deg)',
                                    transitionDelay: `${delay + index * 200}ms`
                                }}
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>
            </div>
            <div className="space-y-1 sm:space-y-2 max-w-full">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div 
                            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                            {item.label}: {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DonutChart = ({ data, delay = 0 }: DonutChartProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    let cumulativePercentage = 0;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
                <svg width="100" height="100" className={`sm:w-[120px] sm:h-[120px] transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        className="dark:stroke-gray-700 sm:stroke-[15]"
                    />
                    {data.map((item, index) => {
                        const percentage = total > 0 ? (item.value / total) * 100 : 0;
                        const strokeDasharray = `${percentage * 2.2} 220`;
                        const strokeDashoffset = -cumulativePercentage * 2.2;
                        cumulativePercentage += percentage;
                        
                        return (
                            <circle
                                key={index}
                                cx="50"
                                cy="50"
                                r="35"
                                fill="none"
                                stroke={item.color}
                                strokeWidth="12"
                                strokeDasharray={isVisible ? strokeDasharray : '0 220'}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-1000 ease-out sm:stroke-[15]"
                                style={{ 
                                    transformOrigin: '50px 50px',
                                    transform: 'rotate(-90deg)',
                                    transitionDelay: `${delay + index * 200}ms`
                                }}
                                strokeLinecap="round"
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{total}</div>
                        <div className="text-xs text-gray-500">Total</div>
                    </div>
                </div>
            </div>
            <div className="space-y-1 max-w-full">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div 
                            className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                            {item.label}: {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LineChart = ({ data, delay = 0 }: LineChartProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const maxValue = Math.max(...data.map(d => d.value));
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    const width = 280;
    const height = 120;
    const padding = 20;

    const points = data.map((item, index) => {
        const x = padding + (index * (width - padding * 2)) / (data.length - 1);
        const y = height - padding - ((item.value / maxValue) * (height - padding * 2));
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="w-full">
            <svg width="100%" height="120" viewBox={`0 0 ${width} ${height}`} className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <line
                        key={i}
                        x1={padding}
                        y1={padding + (i * (height - padding * 2)) / 4}
                        x2={width - padding}
                        y2={padding + (i * (height - padding * 2)) / 4}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        className="dark:stroke-gray-700"
                    />
                ))}
                
                {/* Line */}
                <polyline
                    points={points}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className={`transition-all duration-2000 ease-out`}
                    style={{
                        strokeDasharray: isVisible ? 'none' : '1000',
                        strokeDashoffset: isVisible ? '0' : '1000',
                        transitionDelay: `${delay}ms`
                    }}
                />
                
                {/* Points */}
                {data.map((item, index) => {
                    const x = padding + (index * (width - padding * 2)) / (data.length - 1);
                    const y = height - padding - ((item.value / maxValue) * (height - padding * 2));
                    return (
                        <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="3"
                            fill="#3b82f6"
                            className={`transition-all duration-500`}
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transitionDelay: `${delay + index * 100}ms`
                            }}
                        />
                    );
                })}
            </svg>
            
            {/* Labels */}
            <div className="flex justify-between mt-2 px-4">
                {data.map((item, index) => (
                    <span key={index} className="text-xs text-gray-500 truncate" style={{maxWidth: '60px'}}>
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    );
};

export function DashboardView({ selectedEmails }: { selectedEmails: Email[] }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Generate analytics data from selectedEmails
    const generateAnalytics = () => {
        if (selectedEmails.length === 0) {
            return {
                totalEmails: 0,
                avgOpenRate: 0,
                avgClickRate: 0,
                totalSent: 0,
                statusDistribution: [],
                typeDistribution: [],
                audienceDistribution: [],
                performanceData: [],
                trendData: [],
                recentEmails: 0
            };
        }

        const totalEmails = selectedEmails.length;
        const avgOpenRate = selectedEmails.reduce((sum, email) => sum + email.openRate, 0) / totalEmails;
        const avgClickRate = selectedEmails.reduce((sum, email) => sum + email.clickRate, 0) / totalEmails;
        const totalSent = selectedEmails.reduce((sum, email) => sum + email.sent, 0);

        // Status distribution
        const statusCounts = selectedEmails.reduce((acc, email) => {
            acc[email.status] = (acc[email.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const statusColors = {
            'Draft': '#6b7280',
            'Scheduled': '#3b82f6',
            'Sent': '#10b981',
            'Published': '#059669',
            'Paused': '#ef4444',
            'Brew Recommendation': '#8b5cf6'
        };

        const statusDistribution = Object.entries(statusCounts).map(([status, count]) => ({
            label: status,
            value: count,
            color: statusColors[status as keyof typeof statusColors] || '#6b7280'
        }));

        // Type distribution
        const typeCounts = selectedEmails.reduce((acc, email) => {
            acc[email.type] = (acc[email.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const typeColors = {
            'Newsletter': '#f59e0b',
            'Promotional': '#ef4444',
            'Transactional': '#10b981',
            'Announcement': '#3b82f6',
            'Welcome': '#8b5cf6'
        };

        const typeDistribution = Object.entries(typeCounts).map(([type, count]) => ({
            label: type,
            value: count,
            color: typeColors[type as keyof typeof typeColors] || '#6b7280'
        }));

        // Audience distribution (top 5)
        const audienceCounts = selectedEmails.reduce((acc, email) => {
            acc[email.audience] = (acc[email.audience] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const audienceDistribution = Object.entries(audienceCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([audience, count]) => ({
                label: audience.substring(0, 12) + (audience.length > 12 ? '...' : ''),
                value: count,
                maxValue: Math.max(...Object.values(audienceCounts))
            }));

        // Performance data (open rates by status)
        const performanceData = Object.entries(statusCounts).map(([status]) => {
            const statusEmails = selectedEmails.filter(email => email.status === status);
            const avgRate = statusEmails.reduce((sum, email) => sum + email.openRate, 0) / statusEmails.length;
            return {
                label: status,
                value: Math.round(avgRate),
                maxValue: 100
            };
        });

        // Trend data (mock weekly performance)
        const trendData = [
            { label: 'Week 1', value: Math.round(avgOpenRate * 0.8) },
            { label: 'Week 2', value: Math.round(avgOpenRate * 0.9) },
            { label: 'Week 3', value: Math.round(avgOpenRate * 1.1) },
            { label: 'Week 4', value: Math.round(avgOpenRate) },
            { label: 'Week 5', value: Math.round(avgOpenRate * 1.2) }
        ];

        // Recent emails (last 7 days)
        const recentEmails = selectedEmails.filter(email => {
            const emailDate = new Date(email.createdAt);
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return emailDate > sevenDaysAgo;
        }).length;

        return {
            totalEmails,
            avgOpenRate,
            avgClickRate,
            totalSent,
            statusDistribution,
            typeDistribution,
            audienceDistribution,
            performanceData,
            trendData,
            recentEmails
        };
    };

    const analytics = generateAnalytics();

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
        <div className={`p-3 sm:p-6 h-full overflow-y-auto transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2">
                <MetricCard
                    title="Total Emails"
                    value={analytics.totalEmails.toString()}
                    change="+12%"
                    changeType="increase"
                    icon={<Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
                    delay={100}
                />
                <MetricCard
                    title="Avg Open Rate"
                    value={`${analytics.avgOpenRate.toFixed(1)}%`}
                    change="+2.3%"
                    changeType="increase"
                    icon={<Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />}
                    delay={200}
                />
                <MetricCard
                    title="Avg Click Rate"
                    value={`${analytics.avgClickRate.toFixed(1)}%`}
                    change="-0.8%"
                    changeType="decrease"
                    icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />}
                    delay={300}
                />
                <MetricCard
                    title="Total Sent"
                    value={analytics.totalSent.toLocaleString()}
                    change="Active"
                    changeType="neutral"
                    icon={<Users className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />}
                    delay={400}
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-2">
                {/* Email Status Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">Status Distribution</h3>
                    </div>
                    <PieChart data={analytics.statusDistribution} delay={500} />
                </div>

                {/* Email Type Distribution */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">Email Types</h3>
                    </div>
                    <DonutChart data={analytics.typeDistribution} delay={600} />
                </div>

                {/* Performance Trend */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">Open Rate Trend</h3>
                    </div>
                    <LineChart data={analytics.trendData} delay={700} />
                </div>

                {/* Performance by Status */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">Open Rate by Status</h3>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        {analytics.performanceData.map((item, index) => (
                            <ChartBar
                                key={item.label}
                                label={item.label}
                                value={item.value}
                                maxValue={item.maxValue}
                                color="bg-gradient-to-r from-green-400 to-green-600"
                                delay={800 + index * 100}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Audience Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">Top Audiences</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                    {analytics.audienceDistribution.map((item, index) => (
                        <ChartBar
                            key={item.label}
                            label={item.label}
                            value={item.value}
                            maxValue={item.maxValue}
                            color="bg-gradient-to-r from-purple-400 to-purple-600"
                            delay={1200 + index * 100}
                        />
                    ))}
                </div>
            </div>

            {/* Additional Insights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        <h4 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h4>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">{analytics.recentEmails}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">emails in last 7 days</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                        <h4 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">Engagement Score</h4>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                        {((analytics.avgOpenRate + analytics.avgClickRate) / 2).toFixed(1)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">average engagement</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 ">
                        <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                        <h4 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white">Best Performer</h4>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                        {Math.max(...selectedEmails.map(e => e.openRate)).toFixed(1)}%
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">highest open rate</p>
                </div>
            </div>
        </div>
    );
}