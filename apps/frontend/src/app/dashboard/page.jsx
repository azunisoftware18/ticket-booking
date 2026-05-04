import React from "react";
import { TrendingUp, TrendingDown, Users } from "lucide-react";

// StatCard Component (image mein upper dikh rahe 4 cards ke liye)
const StatCard = ({
  title,
  value,
  percentage,
  isUp,
  trendingText,
  subText,
}) => (
  <div
    style={{
      backgroundColor: "var(--card)",
      color: "var(--card-foreground)",
      borderColor: "var(--border)",
    }}
    className="p-6 rounded-(--radius) border shadow-sm flex flex-col gap-1.5"
  >
    <div className="flex items-center justify-between">
      <p
        style={{ color: "var(--muted-foreground)" }}
        className="text-xs font-medium"
      >
        {title}
      </p>
      {/* Badge color primary OKLCH based hai par uske sath trend logic lagai hai */}
      <div
        style={{
          backgroundColor: isUp ? "var(--sidebar-ring)" : "oklch(0.92 0.04 28)", // Custom light red for down trend
          color: isUp ? "oklch(0.3 0.1 140)" : "oklch(0.45 0.18 13.6)", // Custom dark green/red
        }}
        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold`}
      >
        {isUp ? (
          <TrendingUp size={12} strokeWidth={3} />
        ) : (
          <TrendingDown size={12} strokeWidth={3} />
        )}
        {percentage}
      </div>
    </div>
    <p
      style={{ color: "var(--foreground)" }}
      className="text-3xl font-extrabold tracking-tight"
    >
      {value}
    </p>
    <div
      style={{ color: "var(--muted-foreground)" }}
      className="text-xs space-y-0.5 mt-2"
    >
      <p className="flex items-center gap-1.5">
        {trendingText} <Users size={12} />
      </p>
      <p>{subText}</p>
    </div>
  </div>
);

// FilterButton Component (chart ke upar filters ke liye)
const FilterButton = ({ label, isActive }) => (
  <button
    style={{
      backgroundColor: isActive ? "var(--background)" : "transparent",
      color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
      borderColor: isActive ? "var(--border)" : "transparent",
    }}
    className={`px-4 py-1.5 text-xs font-medium rounded-md border ${isActive ? "shadow-sm" : ""} transition-all hover:bg-(--muted)/50`}
  >
    {label}
  </button>
);

export default function page() {
  return (
    <div
      style={{ backgroundColor: "var(--background)" }}
      className="p-8 space-y-8 min-h-screen w-full"
    >
      {/* 1. Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$1,250.00"
          percentage="+12.5%"
          isUp={true}
          trendingText="Trending up this month"
          subText="Visitors for the last 6 months"
        />
        <StatCard
          title="New Customers"
          value="1,234"
          percentage="-20%"
          isUp={false}
          trendingText="Down 20% this period"
          subText="Acquisition needs attention"
        />
        <StatCard
          title="Active Accounts"
          value="45,678"
          percentage="+12.5%"
          isUp={true}
          trendingText="Strong user retention"
          subText="Engagement exceeds targets"
        />
        <StatCard
          title="Growth Rate"
          value="4.5%"
          percentage="+4.5%"
          isUp={true}
          trendingText="Steady performance increase"
          subText="Meets growth projections"
        />
      </div>

      {/* 2. Chart Section */}
      <div
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
        className="rounded-(--radius) border shadow-sm p-8 space-y-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2
              style={{ color: "var(--foreground)" }}
              className="text-lg font-extrabold tracking-tight"
            >
              Total Visitors
            </h2>
            <p style={{ color: "var(--muted-foreground)" }} className="text-sm">
              Total for the last 3 months
            </p>
          </div>

          <div
            style={{ backgroundColor: "var(--muted)" }}
            className="flex items-center gap-0.5 p-1 rounded-lg border border-border"
          >
            <FilterButton label="Last 3 months" isActive={true} />
            <FilterButton label="Last 30 days" isActive={false} />
            <FilterButton label="Last 7 days" isActive={false} />
          </div>
        </div>

        {/* Placeholder graph jesa image_0.png mein dikh raha he same effect ke liye */}
        <div className="relative h-75 w-full pt-10">
          {/* Grid Lines */}
          <div className="absolute inset-x-0 top-0 h-full w-full space-y-12.25 border-l border-border pl-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-px bg-border"></div>
            ))}
          </div>

          {/* Area Graph Placeholder (Custom Gradient matching image_0.png) */}
          <div className="relative ml-10 h-62.5 w-full bg-background">
            <svg
              viewBox="0 0 800 250"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  {/* Color is primary/chart-1 OKLCH based hue */}
                  <stop
                    offset="0%"
                    stopColor="oklch(0.645 0.246 16.439 / 20%)"
                    stopOpacity="1"
                  />
                  <stop
                    offset="100%"
                    stopColor="oklch(0.645 0.246 16.439 / 5%)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path
                d="M0,200 Q200,100 400,200 T800,200 L800,250 L0,250 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0,200 Q200,100 400,200 T800,200"
                stroke="oklch(0.586 0.253 17.585)" // --chart-3 OKLCH variable hue
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          {/* X-Axis Labels */}
          <div
            style={{ color: "var(--muted-foreground)" }}
            className="flex items-center justify-around w-full ml-10 pt-4 text-xs font-medium"
          >
            {[
              "Jun 24",
              "Jun 25",
              "Jun 26",
              "Jun 27",
              "Jun 28",
              "Jun 29",
              "Jun 30",
            ].map((date) => (
              <span key={date}>{date}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
