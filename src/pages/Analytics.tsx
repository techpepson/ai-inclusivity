import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  RefreshCw,
  Download,
  ArrowUp,
  Target,
  Flame,
  PieChart,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import analyticsImage from "@/assets/analytics-dashboard.jpg";
import { SiteFooter } from "@/components/SiteFooter";

const SENTIMENT_DATA = [
  { month: "Jan", positive: 65, neutral: 25, negative: 10 },
  { month: "Feb", positive: 70, neutral: 20, negative: 10 },
  { month: "Mar", positive: 75, neutral: 18, negative: 7 },
  { month: "Apr", positive: 68, neutral: 22, negative: 10 },
  { month: "May", positive: 72, neutral: 20, negative: 8 },
  { month: "Jun", positive: 80, neutral: 15, negative: 5 },
];

const ENGAGEMENT_DATA = [
  { week: "Week 1", likes: 12000, shares: 8000, comments: 5000 },
  { week: "Week 2", likes: 15000, shares: 10000, comments: 6000 },
  { week: "Week 3", likes: 18000, shares: 12000, comments: 8000 },
  { week: "Week 4", likes: 22000, shares: 15000, comments: 10000 },
];

const FOCUS_DISTRIBUTION = [
  { name: "PwDs", percentage: 35, color: "bg-blue-700" },
  { name: "VAW", percentage: 28, color: "bg-blue-500" },
  { name: "Mental Health", percentage: 22, color: "bg-sky-500" },
  { name: "SGMC", percentage: 15, color: "bg-slate-400" },
];

const TOP_CAMPAIGNS = [
  { rank: 1, name: "#InclusionMatters", reach: "1.2M", engagement: 94 },
  { rank: 2, name: "#EndVAW", reach: "2.1M", engagement: 89 },
  { rank: 3, name: "#BreakTheStigma", reach: "1.0M", engagement: 91 },
  { rank: 4, name: "#SGMCRights", reach: "0.8M", engagement: 86 },
];

const TRENDING_KEYWORDS = [
  { keyword: "#accessibility", count: "15,420", change: "+24%" },
  { keyword: "#mental health", count: "12,890", change: "+18%" },
  { keyword: "#safe spaces", count: "10,230", change: "+32%" },
  { keyword: "#equality", count: "8,950", change: "+15%" },
  { keyword: "#inclusion", count: "7,680", change: "+21%" },
];

const AI_INSIGHTS = [
  {
    icon: ArrowUp,
    title: "24%",
    description: "Positive sentiment increase this month across all campaigns",
    bgColor: "bg-gradient-to-br from-green-400 to-teal-500",
  },
  {
    icon: Target,
    title: "Peak Time",
    description: "Best engagement: Tuesdays & Thursdays, 6-9 PM GMT",
    bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    icon: Flame,
    title: "Trending",
    description: "#BreakTheStigma seeing 340% spike in mentions this week",
    bgColor: "bg-gradient-to-br from-sky-500 to-blue-700",
  },
];

export default function Analytics() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[430px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={analyticsImage}
            alt="Analytics Dashboard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/80 to-sky-800/75"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2 mb-6 animate-fade-in-down">
            <span className="text-sm font-medium">
              Real-Time Analytics Dashboard
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight text-white animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            Data-Driven <span className="text-cyan-300">Insights</span>
          </h1>

          {/* Description */}
          <p
            className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Our AI engine analyzes millions of social media conversations to
            track sentiment, engagement, and campaign performance in real-time.
          </p>

          {/* Action Buttons */}
          <div
            className="flex justify-center gap-4 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              variant="outline"
              className="gap-2 border-white/60 bg-white/10 text-white hover:bg-white/20"
              onClick={handleRefresh}
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            {/* <Button className="bg-cyan-300 text-blue-950 hover:bg-cyan-200 gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button> */}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 via-background to-slate-50/60">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <Card className="border-blue-100/80 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Total Reach
                </p>
                <p className="text-2xl font-bold text-blue-900">5.0M+</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100/80 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Policy Wins
                </p>
                <p className="text-2xl font-bold text-blue-900">12</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100/80 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold text-blue-900">24</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100/80 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Community Voices
                </p>
                <p className="text-2xl font-bold text-blue-900">12,500+</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sentiment Analysis Chart */}
            <Card
              className="border border-blue-100/80 hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-700" />
                  Sentiment Analysis Trends
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Monthly sentiment distribution
                </p>
              </CardHeader>
              <CardContent>
                {/* Simplified Bar Chart Representation */}
                <div className="space-y-3">
                  {SENTIMENT_DATA.map((data, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-8 text-xs text-muted-foreground">
                        {data.month}
                      </span>
                      <div className="flex-1 flex h-4 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 transition-all duration-500"
                          style={{ width: `${data.positive}%` }}
                        />
                        <div
                          className="bg-blue-300 transition-all duration-500"
                          style={{ width: `${data.neutral}%` }}
                        />
                        <div
                          className="bg-slate-400 transition-all duration-500"
                          style={{ width: `${data.negative}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>positive</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                    <span>neutral</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                    <span>negative</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Engagement Growth Chart */}
            <Card
              className="border border-blue-100/80 hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-700" />
                  Engagement Growth
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Weekly performance metrics
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ENGAGEMENT_DATA.map((data, index) => (
                    <div key={index} className="space-y-1">
                      <span className="text-xs text-muted-foreground">
                        {data.week}
                      </span>
                      <div className="flex gap-1 h-6">
                        <div
                          className="bg-blue-700 rounded transition-all duration-500"
                          style={{ width: `${(data.likes / 22000) * 100}%` }}
                          title={`Likes: ${data.likes.toLocaleString()}`}
                        />
                        <div
                          className="bg-blue-500 rounded transition-all duration-500"
                          style={{ width: `${(data.shares / 22000) * 100}%` }}
                          title={`Shares: ${data.shares.toLocaleString()}`}
                        />
                        <div
                          className="bg-cyan-400 rounded transition-all duration-500"
                          style={{ width: `${(data.comments / 22000) * 100}%` }}
                          title={`Comments: ${data.comments.toLocaleString()}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
                    <span>likes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>shares</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span>comments</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Focus Area Distribution */}
            <Card
              className="border border-blue-100/80 hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-700" />
                  Focus Area Distribution
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Campaign allocation
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center mb-6">
                  {/* Pie-like visualization */}
                  <div className="relative w-32 h-32">
                    <svg
                      viewBox="0 0 36 36"
                      className="w-full h-full transform -rotate-90"
                    >
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#1d4ed8"
                        strokeWidth="3"
                        strokeDasharray="35 65"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeDasharray="28 72"
                        strokeDashoffset="-35"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#0ea5e9"
                        strokeWidth="3"
                        strokeDasharray="22 78"
                        strokeDashoffset="-63"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="3"
                        strokeDasharray="15 85"
                        strokeDashoffset="-85"
                      />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  {FOCUS_DISTRIBUTION.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${item.color}`}
                        ></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats & Insights Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Campaigns */}
            <Card
              className="border border-blue-100/80 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-700" />
                  Top Campaigns
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Performance overview
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {TOP_CAMPAIGNS.map((campaign) => (
                    <div
                      key={campaign.rank}
                      className="flex items-center gap-4 p-3 bg-blue-50/60 rounded-lg hover:bg-blue-100/60 transition-colors"
                    >
                      <span className="w-6 h-6 flex items-center justify-center bg-blue-700 text-white text-sm font-bold rounded-full">
                        {campaign.rank}
                      </span>
                      <div className="flex-1">
                        <div className="font-medium text-blue-800">
                          {campaign.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Reach: {campaign.reach}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-700">
                          {campaign.engagement}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Engagement
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Keywords */}
            <Card
              className="border border-blue-100/80 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-700" />
                  Trending Keywords This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {TRENDING_KEYWORDS.map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border-b border-blue-100/80 last:border-0"
                    >
                      <span className="text-blue-800 font-medium">
                        {keyword.keyword}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          {keyword.count}
                        </span>
                        <span className="text-sm font-medium text-blue-700">
                          {keyword.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI-Generated Insights */}
            <Card
              className="border border-blue-100/80 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-700" />
                  AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {AI_INSIGHTS.map((insight, index) => (
                    <div
                      key={index}
                      className={`${insight.bgColor} p-4 rounded-lg text-white`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <insight.icon className="h-4 w-4" />
                        <span className="font-bold">{insight.title}</span>
                      </div>
                      <p className="text-sm opacity-90">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
