import { TrendingUp, Users, BarChart3, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatItem {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
}

const stats: StatItem[] = [
  { label: "Social Impact Reach", value: "2.3M", change: "+23%", icon: TrendingUp },
  { label: "Active Advocates", value: "15.2k", change: "+18%", icon: Users },
  { label: "Policy Changes", value: "47", change: "+12%", icon: Target },
  { label: "Campaign Success Rate", value: "89%", change: "+5%", icon: BarChart3 },
];

export function ProfessionalStats() {
  return (
    <section className="py-16 bg-gradient-mesh">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Driving Real Impact</h2>
          <p className="text-lg text-muted-foreground">
            Our data-driven approach delivers measurable results for social change.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm shadow-professional hover:shadow-elegant transition-all duration-300">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-green-600 font-semibold">{stat.change} this year</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}