import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HMR_LOGO } from "@/constants";
import Summaries from "@/components/Summaries";
import api from "@/api";

export default function ManagerDashboard() {
  const responseRatesRef = useRef<HTMLCanvasElement | null>(null);
  const coherenceScoresRef = useRef<HTMLCanvasElement | null>(null);
  const topicWordScoresRef = useRef<HTMLCanvasElement | null>(null);

  const responseRatesChartRef = useRef<Chart | null>(null);
  const coherenceScoresChartRef = useRef<Chart | null>(null);
  const topicWordScoresChartRef = useRef<Chart | null>(null);

  const [activeTab, setActiveTab] = useState("analytics");
  interface TopicModelingResult {
    topic: string;
    keywords: string;
    summary: string;
  }

  const [topicModelingResults, setTopicModelingResults] = useState<TopicModelingResult[]>([]);

  const fetchTopicModelingResults = async () => {
    try {
      const response = await api.get("/api/topic-modeling/");
      setTopicModelingResults(response.data);
    } catch (error) {
      console.error("Error fetching topic modeling results", error);
    }
  };

  useEffect(() => {
    if (activeTab === "analytics") {
      fetchTopicModelingResults();
      initializeCharts();
    }

    return () => {
      if (responseRatesChartRef.current) {
        responseRatesChartRef.current.destroy();
      }
      if (coherenceScoresChartRef.current) {
        coherenceScoresChartRef.current.destroy();
      }
      if (topicWordScoresChartRef.current) {
        topicWordScoresChartRef.current.destroy();
      }
    };
  }, [activeTab]);

  const initializeCharts = () => {
    // Initialize charts with dummy data or fetched data
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 shadow-lg rounded">
        <Tabs defaultValue="analytics" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="summaries">Summaries</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics">
            <div className="flex justify-center mb-6">
              <img src={HMR_LOGO} alt="Logo 2" className="h-12" />
            </div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <p className="mb-4">Number of contributors: 20</p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium mb-2">Response Rates for Questions</h2>
                <canvas ref={responseRatesRef} />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2">Coherence Scores by Segmentation Method</h2>
                <canvas ref={coherenceScoresRef} />
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-2">Topic Word Scores</h2>
              <canvas ref={topicWordScoresRef} />
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-2">Topic Modeling Results</h2>
              <ul>
                {topicModelingResults.map((result, index) => (
                  <li key={index}>
                    <h3>{result.topic}</h3>
                    <p>{result.keywords}</p>
                    <p>{result.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="summaries">
            <Summaries />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
