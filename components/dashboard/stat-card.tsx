import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: string | number;
  outOf?: number;
  outOfLabel?: string;
  icon: React.ReactNode;
  description?: React.ReactNode;
  isLoading?: boolean;
  iconContainerClassName?: string;
}

export function StatCard({
  title,
  value,
  outOf,
  outOfLabel,
  icon,
  description,
  isLoading,
  iconContainerClassName,
}: StatCardProps) {
  const numericValue = isNaN(Number(value)) ? 0 : Number(value);
  const outOfValue = typeof outOf === "number" ? outOf : 0;
  const percentage =
    outOfValue > 0 ? Math.min((numericValue / outOfValue) * 100, 100) : 0;

  return (
    <Card className="py-4 h-full shadow-sm bg-gradient-to-b from-card to-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${iconContainerClassName || "bg-emerald-500/10 text-emerald-500"}`}
        >
          {icon}
        </div>
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        {isLoading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <>
            <div className="text-xl font-bold text-foreground leading-tight">
              {numericValue.toLocaleString()}
            </div>

            {/* OUT OF TEXT */}
            {typeof outOf === "number" && (
              <>
                <p className="text-xs text-muted-foreground mt-1">
                  out of{" "}
                  <span className="font-bold text-blue-600">
                    {outOf.toLocaleString()}
                  </span>
                  {outOfLabel ? ` ${outOfLabel}` : ""}
                </p>

                {/* PROGRESS BAR */}
                <div className="mt-2 bg-amber-200 p-2 border rounded-md">
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{percentage.toFixed(2)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </>
            )}

            {description && (
              <div className="text-xs text-muted-foreground mt-2">
                {description}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
