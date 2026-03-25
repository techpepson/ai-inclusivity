import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  ArrowUp,
  ArrowUpRight,
  Target,
  Flame,
  PieChart,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import analyticsImage from "@/assets/analytics-dashboard.jpg";
import { SiteFooter } from "@/components/SiteFooter";
import { Link } from "react-router-dom";

const SENTIMENT_DATA = [
  { month: "Jan", positive: 65, neutral: 25, negative: 10 },
  { month: "Feb", positive: 70, neutral: 20, negative: 10 },
  { month: "Mar", positive: 75, neutral: 18, negative: 7 },
  { month: "Apr", positive: 68, neutral: 22, negative: 10 },
  { month: "May", positive: 72, neutral: 20, negative: 8 },
  { month: "Jun", positive: 80, neutral: 15, negative: 5 },
];

type EngagementPoint = {
  month: string;
  likes: number;
  shares: number;
  comments: number;
};

const ENGAGEMENT_DATA: EngagementPoint[] = [
  { month: "Jan", likes: 12100, shares: 9800, comments: 6300 },
  { month: "Feb", likes: 13500, shares: 9400, comments: 6400 },
  { month: "Mar", likes: 15200, shares: 9000, comments: 6200 },
  { month: "Apr", likes: 17000, shares: 8600, comments: 6000 },
  { month: "May", likes: 18800, shares: 8000, comments: 5800 },
  { month: "Jun", likes: 20500, shares: 7300, comments: 5600 },
  { month: "Jul", likes: 22400, shares: 6800, comments: 5400 },
  { month: "Aug", likes: 24400, shares: 6300, comments: 5200 },
  { month: "Sep", likes: 26200, shares: 5800, comments: 5000 },
  { month: "Oct", likes: 27900, shares: 5400, comments: 4900 },
  { month: "Nov", likes: 29800, shares: 5000, comments: 4700 },
  { month: "Dec", likes: 31700, shares: 4600, comments: 4500 },
];

type EngagementMetricKey = keyof Omit<EngagementPoint, "month">;

const ENGAGEMENT_METRICS: {
  key: EngagementMetricKey;
  label: string;
  color: string;
}[] = [
  { key: "likes", label: "Neutral", color: "#0ea5e9" },
  { key: "shares", label: "Positive", color: "#f97316" },
  { key: "comments", label: "Negative", color: "#475569" },
];

type EngagementHover = {
  metric: string;
  value: number;
  month: string;
  color: string;
};

const SENTIMENT_BREAKDOWN = [
  {
    label: "Positive",
    value: 1002,
    color: "#10b981",
    legendColor: "bg-emerald-500",
  },
  {
    label: "Neutral",
    value: 8338,
    color: "#475569",
    legendColor: "bg-slate-600",
  },
  {
    label: "Negative",
    value: 6226,
    color: "#f43f5e",
    legendColor: "bg-rose-500",
  },
] as const;

const SENTIMENT_TOTAL = SENTIMENT_BREAKDOWN.reduce(
  (sum, segment) => sum + segment.value,
  0,
);

const TOP_CAMPAIGNS = [
  { rank: 2, name: "#EndVAW", engagement: 52.0 },
  { rank: 1, name: "#PWD", engagement: 34.4 },
  { rank: 4, name: "#SGMRights", engagement: 4.1 },
  { rank: 3, name: "#MentalHealth", engagement: 2.2 },
];

const TRENDING_KEYWORDS = [
  { keyword: "#10ForAbility", count: "9,120" },
  { keyword: "#16DaysOfActivism", count: "7,870" },
  { keyword: "#accessibility", count: "5,430" },
  { keyword: "#equality", count: "4,980" },
  { keyword: "#inclusion", count: "4,980" },
];

const AI_INSIGHTS = [
  {
    description: "Neutral sentiments dominate across VAW and SGM.",
    bgColor: "bg-gradient-to-br from-green-400 to-teal-500",
  },
  {
    icon: Target,
    title: "Peak Time",
    description: "Best engagement: August 2025 & February 2026",
    bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    icon: Flame,
    title: "Trending",
    description:
      "#BreakTheStigma seeing about 65% spike in mentions last year.",
    bgColor: "bg-gradient-to-br from-sky-500 to-blue-700",
  },
];

export default function Analytics() {
  const [activeSentiment, setActiveSentiment] = useState<
    (typeof SENTIMENT_BREAKDOWN)[number] | null
  >(null);
  const [activeEngagementPoint, setActiveEngagementPoint] =
    useState<EngagementHover | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const selectedSentiment = activeSentiment;
  const displayLabel = selectedSentiment?.label ?? "Total Mentions";
  const displayValue = selectedSentiment?.value ?? SENTIMENT_TOTAL;

  const sentimentArcs = (() => {
    let cumulativePercent = 0;
    return SENTIMENT_BREAKDOWN.map((segment) => {
      const percentage = (segment.value / SENTIMENT_TOTAL) * 100;
      const arc = (
        <circle
          key={segment.label}
          cx="18"
          cy="18"
          r="15.915"
          fill="none"
          stroke={segment.color}
          strokeWidth="3.8"
          strokeDasharray={`${percentage} ${100 - percentage}`}
          strokeDashoffset={-cumulativePercent}
          strokeLinecap="round"
          className="transition-opacity duration-300"
          style={{
            cursor: "pointer",
            opacity:
              selectedSentiment && selectedSentiment.label !== segment.label
                ? 0.35
                : 1,
          }}
          aria-label={`${segment.label}: ${segment.value.toLocaleString()} mentions`}
          tabIndex={0}
          onMouseEnter={() => setActiveSentiment(segment)}
          onMouseLeave={() => setActiveSentiment(null)}
          onFocus={() => setActiveSentiment(segment)}
          onBlur={() => setActiveSentiment(null)}
        />
      );
      cumulativePercent += percentage;
      return arc;
    });
  })();

  const chartWidth = 640;
  const chartHeight = 260;
  const chartPadding = { top: 16, right: 24, bottom: 36, left: 48 };
  const innerWidth = chartWidth - chartPadding.left - chartPadding.right;
  const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom;
  const maxEngagementValue = Math.max(
    ...ENGAGEMENT_DATA.flatMap((point) =>
      ENGAGEMENT_METRICS.map((metric) => point[metric.key]),
    ),
  );

  const getX = (index: number) =>
    chartPadding.left +
    (innerWidth * index) / Math.max(ENGAGEMENT_DATA.length - 1, 1);

  const getY = (value: number) =>
    chartPadding.top + innerHeight - (value / maxEngagementValue) * innerHeight;

  const lastEngagementPoint =
    ENGAGEMENT_DATA[ENGAGEMENT_DATA.length - 1] ?? ENGAGEMENT_DATA[0];
  const defaultEngagementHighlight: EngagementHover = {
    metric: ENGAGEMENT_METRICS[0].label,
    value: lastEngagementPoint
      ? lastEngagementPoint[ENGAGEMENT_METRICS[0].key]
      : 0,
    month: lastEngagementPoint?.month ?? "",
    color: ENGAGEMENT_METRICS[0].color,
  };

  const engagementHighlight =
    activeEngagementPoint ?? defaultEngagementHighlight;
  const activeMetricLabel = activeEngagementPoint?.metric ?? null;

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
          {/* <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-full px-5 py-2 mb-6 animate-fade-in-down">
            <span className="text-sm font-medium">
              Real-Time Analytics Dashboard
            </span>
          </div> */}

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
            track sentiment and engagement in real-time.
          </p>

          {/* Action Buttons */}
          <div
            className="flex justify-center gap-4 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              asChild
              className="group relative inline-flex items-center overflow-hidden rounded-full border border-white/50 bg-white/5 px-8 py-3 text-base font-semibold text-white shadow-[0_8px_30px_rgba(14,165,233,0.45)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-cyan-200/80 hover:bg-white/10 hover:shadow-[0_18px_60px_rgba(14,165,233,0.55)] focus-visible:ring-white/80"
            >
              <Link
                to="http://187.77.180.160/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit the live AI analytics dashboard"
                className="relative flex items-center gap-3"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-sky-500/30 to-blue-700/40 opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                <span className="relative z-10 flex items-center gap-2">
                  Visit Analytics Dashboard
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span
                  className="absolute -inset-x-10 inset-y-full translate-y-0 bg-gradient-to-r from-white/0 via-white/60 to-white/0 opacity-80 blur-2xl transition-all duration-500 group-hover:-inset-y-10"
                  aria-hidden="true"
                />
              </Link>
            </Button>
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
                  Total Tweets
                </p>
                <p className="text-2xl font-bold text-blue-900"> &gt;26.6K</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100/80 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Hashtag Usage
                </p>
                <p className="text-2xl font-bold text-blue-900"> &gt;3.5K</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100/80 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Influencers
                </p>
                <p className="text-2xl font-bold text-blue-900"> &gt;20</p>
              </CardContent>
            </Card>
            <Card className="border-blue-100/80 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                  Engagements
                </p>
                <p className="text-2xl font-bold text-blue-900"> &gt;500</p>
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
                    <span>neutral</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                    <span>positive</span>
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
                  Forecasting Analysis
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  12-month interaction trend analysis
                </p>
              </CardHeader>
              <CardContent>
                <div
                  className="space-y-6"
                  onMouseLeave={() => setActiveEngagementPoint(null)}
                >
                  <div className="relative w-full overflow-x-auto">
                    <svg
                      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                      role="img"
                      aria-label="Monthly engagement growth line chart"
                      className="w-full h-64 min-w-[520px]"
                    >
                      <defs>
                        <linearGradient
                          id="engagement-fill"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#0ea5e9"
                            stopOpacity="0.18"
                          />
                          <stop
                            offset="100%"
                            stopColor="#0ea5e9"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      {Array.from({ length: 5 }).map((_, index) => {
                        const ratio = index / 4;
                        const y = chartPadding.top + ratio * innerHeight;
                        const tickValue = Math.round(
                          maxEngagementValue - ratio * maxEngagementValue,
                        );
                        const formattedTick =
                          tickValue >= 1000
                            ? `${Math.round(tickValue / 1000)}k`
                            : `${tickValue}`;
                        return (
                          <g key={`grid-${index}`}>
                            <line
                              x1={chartPadding.left}
                              x2={chartWidth - chartPadding.right}
                              y1={y}
                              y2={y}
                              stroke="#e2e8f0"
                              strokeDasharray="4 6"
                              strokeWidth={0.8}
                            />
                            <text
                              x={chartPadding.left - 10}
                              y={y + 4}
                              fontSize="11"
                              fill="#94a3b8"
                              textAnchor="end"
                            >
                              {formattedTick}
                            </text>
                          </g>
                        );
                      })}

                      <line
                        x1={chartPadding.left}
                        x2={chartWidth - chartPadding.right}
                        y1={chartHeight - chartPadding.bottom}
                        y2={chartHeight - chartPadding.bottom}
                        stroke="#cbd5f5"
                        strokeWidth={1}
                      />

                      {ENGAGEMENT_METRICS.map((metric, metricIndex) => {
                        const pathD = ENGAGEMENT_DATA.map((point, index) => {
                          const x = getX(index);
                          const y = getY(point[metric.key]);
                          return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                        }).join(" ");

                        const isDimmed =
                          Boolean(activeMetricLabel) &&
                          activeMetricLabel !== metric.label;

                        return (
                          <g key={metric.key}>
                            {metricIndex === 0 && (
                              <path
                                d={`${pathD} L ${getX(
                                  ENGAGEMENT_DATA.length - 1,
                                )} ${chartHeight - chartPadding.bottom} L ${getX(
                                  0,
                                )} ${chartHeight - chartPadding.bottom} Z`}
                                fill="url(#engagement-fill)"
                                opacity={isDimmed ? 0.15 : 0.25}
                              />
                            )}
                            <path
                              d={pathD}
                              fill="none"
                              stroke={metric.color}
                              strokeWidth={isDimmed ? 2 : 3}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeOpacity={isDimmed ? 0.35 : 0.95}
                            />
                          </g>
                        );
                      })}

                      {ENGAGEMENT_METRICS.map((metric) =>
                        ENGAGEMENT_DATA.map((point, index) => {
                          const x = getX(index);
                          const y = getY(point[metric.key]);
                          const isActive =
                            engagementHighlight.metric === metric.label &&
                            engagementHighlight.month === point.month &&
                            engagementHighlight.value === point[metric.key];
                          return (
                            <circle
                              key={`${metric.key}-${point.month}`}
                              cx={x}
                              cy={y}
                              r={isActive ? 5 : 3.5}
                              fill="#fff"
                              stroke={metric.color}
                              strokeWidth={isActive ? 3 : 2}
                              className="cursor-pointer transition-all duration-200"
                              tabIndex={0}
                              aria-label={`${metric.label} in ${point.month}: ${point[
                                metric.key
                              ].toLocaleString()} interactions`}
                              onMouseEnter={() =>
                                setActiveEngagementPoint({
                                  metric: metric.label,
                                  value: point[metric.key],
                                  month: point.month,
                                  color: metric.color,
                                })
                              }
                              onFocus={() =>
                                setActiveEngagementPoint({
                                  metric: metric.label,
                                  value: point[metric.key],
                                  month: point.month,
                                  color: metric.color,
                                })
                              }
                              onMouseLeave={() =>
                                setActiveEngagementPoint(null)
                              }
                              onBlur={() => setActiveEngagementPoint(null)}
                            />
                          );
                        }),
                      )}

                      {ENGAGEMENT_DATA.map((point, index) => (
                        <text
                          key={`label-${point.month}`}
                          x={getX(index)}
                          y={chartHeight - chartPadding.bottom + 18}
                          fontSize="11"
                          fill="#94a3b8"
                          textAnchor="middle"
                        >
                          {point.month}
                        </text>
                      ))}
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Active data point
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {engagementHighlight.value.toLocaleString()}
                        <span className="ml-2 text-base font-medium text-muted-foreground">
                          interactions
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {engagementHighlight.metric} ·{" "}
                        {engagementHighlight.month}
                      </p>
                    </div> */}
                    <div className="flex flex-wrap gap-4">
                      {ENGAGEMENT_METRICS.map((metric) => (
                        <div
                          key={metric.key}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: metric.color }}
                          ></span>
                          {metric.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Composition Donut */}
            <Card
              className="border border-blue-100/80 hover:shadow-lg transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-blue-700" />
                  Sentiment Composition
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Hover to inspect mention volume
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48">
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
                        strokeWidth="3.8"
                      />
                      {sentimentArcs}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        {displayLabel}
                      </span>
                      <span className="text-3xl font-bold text-slate-900">
                        {displayValue.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {selectedSentiment
                          ? `${(
                              (selectedSentiment.value / SENTIMENT_TOTAL) *
                              100
                            ).toFixed(1)}% of mentions`
                          : "Across all campaigns"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 w-full space-y-3">
                    {SENTIMENT_BREAKDOWN.map((segment) => {
                      const percentage =
                        (segment.value / SENTIMENT_TOTAL) * 100;
                      return (
                        <div
                          key={segment.label}
                          className="flex items-center justify-between rounded-lg border border-blue-100/80 px-4 py-2"
                          onMouseEnter={() => setActiveSentiment(segment)}
                          onMouseLeave={() => setActiveSentiment(null)}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-3 h-3 rounded-full ${segment.legendColor}`}
                            />
                            <span className="text-sm font-medium">
                              {segment.label}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-slate-900">
                              {segment.value.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
                  Key Themes
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
                  Top Trending Hashtags
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
