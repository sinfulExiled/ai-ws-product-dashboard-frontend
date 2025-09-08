import dynamic from "next/dynamic";
// const InsightsPanel = dynamic(
//   () => import("../../components/Insights/InsightsPanel"),
//   { ssr: false }
// );

export default function AnalyticsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      {/* <InsightsPanel /> */}
    </main>
  );
}
