import { useState } from "react";
import { BarChart3, TrendingUp, Users, Hash, Calendar, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import analyticsImage from "@/assets/analytics-dashboard.jpg";

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const overviewStats = [
    { title: "Total Tweets", value: "450,234", change: "+12.5%", icon: BarChart3 },
    { title: "Active Hashtags", value: "1,247", change: "+8.3%", icon: Hash },
    { title: "Influencers", value: "89", change: "+15.2%", icon: Users },
    { title: "Engagement Rate", value: "7.8%", change: "+2.1%", icon: TrendingUp },
  ];

  const topHashtags = [
    { tag: "#InclusionMatters", count: "45.2k", theme: "Disability", sentiment: "positive" },
    { tag: "#BreakTheStigma", count: "38.7k", theme: "Mental Health", sentiment: "positive" },
    { tag: "#EndVAW", count: "32.1k", theme: "VAW", sentiment: "neutral" },
    { tag: "#DisabilityRightsGH", count: "29.8k", theme: "Disability", sentiment: "positive" },
    { tag: "#MentalHealthAwareness", count: "27.3k", theme: "Mental Health", sentiment: "positive" },
  ];

  const topInfluencers = [
    { name: "@GhanaDisabilityRights", followers: "125k", engagement: "8.9%", theme: "Disability" },
    { name: "@WomenAdvocateGH", followers: "98k", engagement: "12.3%", theme: "VAW" },
    { name: "@MentalHealthGH", followers: "87k", engagement: "10.1%", theme: "Mental Health" },
    { name: "@LGBTQGhana", followers: "76k", engagement: "15.7%", theme: "LGBTQ+" },
    { name: "@InclusiveGhana", followers: "65k", engagement: "9.4%", theme: "General" },
  ];

  const themeData = [
    { theme: "Persons with Disabilities", tweets: 125680, sentiment: 78, color: "bg-theme-disability" },
    { theme: "Mental Health & Wellness", tweets: 98430, sentiment: 82, color: "bg-theme-mental" },
    { theme: "Violence Against Women", tweets: 87250, sentiment: 65, color: "bg-theme-vaw" },
    { theme: "LGBTQ+ Communities", tweets: 54320, sentiment: 71, color: "bg-theme-lgbtq" },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="relative mb-12 rounded-lg overflow-hidden">
          <img 
            src={analyticsImage} 
            alt="Analytics Dashboard" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-lg">
              Real-time insights from social media conversations across Ghana
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div className="flex-1"></div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">
                  {stat.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="themes">By Theme</TabsTrigger>
            <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
            <TabsTrigger value="influencers">Influencers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Theme Comparison */}
            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Activity by Theme</CardTitle>
                <CardDescription>Tweet volume and sentiment across our four focus areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {themeData.map((theme, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{theme.theme}</span>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{theme.tweets.toLocaleString()} tweets</span>
                          <span>{theme.sentiment}% positive</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${theme.color}`}
                          style={{ width: `${(theme.tweets / 125680) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hashtags" className="space-y-8">
            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Top Trending Hashtags</CardTitle>
                <CardDescription>Most active hashtags in the last {selectedPeriod}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topHashtags.map((hashtag, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-mono text-primary">{hashtag.tag}</span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {hashtag.theme}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{hashtag.count}</div>
                        <div className={`text-xs ${
                          hashtag.sentiment === 'positive' ? 'text-green-600' : 
                          hashtag.sentiment === 'negative' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {hashtag.sentiment}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="influencers" className="space-y-8">
            <Card className="bg-gradient-card border-0">
              <CardHeader>
                <CardTitle>Top Influencers</CardTitle>
                <CardDescription>Most influential voices in our advocacy areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topInfluencers.map((influencer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{influencer.name}</div>
                          <div className="text-sm text-muted-foreground">{influencer.theme}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{influencer.followers}</div>
                        <div className="text-xs text-green-600">{influencer.engagement} engagement</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}