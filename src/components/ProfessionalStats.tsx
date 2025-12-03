import { TrendingUp, Users, BarChart3, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, ComponentType, SVGProps } from "react";

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
  const [metrics, setMetrics] = useState<StatItem[]>(DEFAULT_STATS);

  useEffect(() => {
    let mounted = true;

    async function tryFetch(url: string) {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const json = await res.json();
        return json?.metrics ?? null;
      } catch (e) {
        return null;
      }
    }

    async function fetchMetrics() {
      const baseURL = import.meta.env.VITE_BASE_URL || "";
      const endpoints = [
        `${baseURL}/api/metrics`,
        `${baseURL}/get-metrics`,
        "/api/metrics",
        "/get-metrics",
      ];
      let raw: unknown = null;

      for (const ep of endpoints) {
        raw = await tryFetch(ep);
        if (raw) break;
      }

      if (!Array.isArray(raw)) return; // keep defaults
      const arr = raw as unknown[];
      if (arr.length === 0) return;

      const validated: StatItem[] = [];
      for (const item of arr) {
        if (!item || typeof item !== "object") return; // malformed -> keep defaults
        const obj = item as Record<string, unknown>;
        const label =
          typeof obj.label === "string" && obj.label.trim()
            ? obj.label.trim()
            : null;
        const num =
          typeof obj.value === "number"
            ? obj.value
            : typeof obj.value === "string" && (obj.value as string).trim()
            ? Number(obj.value as string)
            : NaN;
        const growth =
          typeof obj.growth === "string" && (obj.growth as string).trim()
            ? (obj.growth as string).trim()
            : null;
        if (!label || !Number.isFinite(num)) return; // malformed

        // map to existing icons by label when possible
        const match = DEFAULT_STATS.find(
          (s) => s.label.toLowerCase() === label.toLowerCase()
        );
        const icon = match ? match.icon : TrendingUp;

        validated.push({
          label,
          value: formatMetricValue(num),
          change: growth ?? "",
          icon,
        });
      }

      if (validated.length > 0 && mounted) setMetrics(validated);
    }

    fetchMetrics();

    return () => {
      mounted = false;
    };
  }, []);

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
                <div className="text-xs text-green-600 font-semibold">
                  {stat.change} this year
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
