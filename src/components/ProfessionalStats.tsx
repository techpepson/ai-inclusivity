import { TrendingUp, Users, BarChart3, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ComponentType, SVGProps } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchImpactMetrics } from "@/lib/api-client";

interface StatItem {
  label: string;
  value: string;
  change: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const DEFAULT_STATS: StatItem[] = [
  {
    label: "Social Impact Reach",
    value: "2.3M",
    change: "+23%",
    icon: TrendingUp,
  },
  { label: "Active Advocates", value: "15.2k", change: "+18%", icon: Users },
  { label: "Policy Changes", value: "47", change: "+12%", icon: Target },
  {
    label: "Campaign Success Rate",
    value: "89%",
    change: "+5%",
    icon: BarChart3,
  },
];

type MetricShape = {
  label: string;
  value: number;
  growth?: string | null;
};

function formatMetricValue(n: number) {
  if (!Number.isFinite(n)) return String(n);
  if (Math.abs(n) >= 1000000) return `${+(n / 1000000).toFixed(1)}M`;
  if (Math.abs(n) >= 1000) return `${+(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function ProfessionalStats() {
  const { data: metricsFromApi = [] } = useQuery({
    queryKey: ["impact-metrics"],
    queryFn: fetchImpactMetrics,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const metrics: StatItem[] =
    metricsFromApi.length > 0
      ? metricsFromApi.map((metric) => {
          const match = DEFAULT_STATS.find(
            (s) => s.label.toLowerCase() === metric.label.toLowerCase(),
          );
          const icon = match ? match.icon : TrendingUp;
          return {
            label: metric.label,
            value: formatMetricValue(metric.value),
            change: "",
            icon,
          };
        })
      : DEFAULT_STATS;

  return (
    <section className="py-16 bg-gradient-mesh">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Driving Real Impact</h2>
          <p className="text-lg text-muted-foreground">
            Our data-driven approach delivers measurable results for social
            change.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((stat, index) => (
            <Card
              key={index}
              className="border-0 bg-white/60 backdrop-blur-sm shadow-professional hover:shadow-elegant transition-all duration-300"
            >
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
