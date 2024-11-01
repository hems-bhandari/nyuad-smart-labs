import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ALEC_LOGO, SMART_LOGO } from "@/constants";
import Summaries from "@/components/Summaries";

export default function ManagerDashboard() {
  const responseRatesRef = useRef<HTMLCanvasElement | null>(null);
  const coherenceScoresRef = useRef<HTMLCanvasElement | null>(null);
  const topicWordScoresRef = useRef<HTMLCanvasElement | null>(null);

  const responseRatesChartRef = useRef<Chart | null>(null);
  const coherenceScoresChartRef = useRef<Chart | null>(null);
  const topicWordScoresChartRef = useRef<Chart | null>(null);

  const [activeTab, setActiveTab] = useState("analytics");

  const initializeCharts = () => {
    // dummy data for Response Rates chart
    const responseRatesData = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Response Rates",
          data: [60, 100, 80, 90],
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };

    // dummy data for Coherence Scores chart
    const coherenceScoresData = {
      labels: ["0.1", "0.2", "0.3", "0.4", "0.5", "0.6"],
      datasets: [
        {
          label: "Coherence Score",
          data: [0.36, 0.45, 0.47, 0.5, 0.52, 0.48],
          borderColor: "rgba(255, 99, 132, 0.6)",
          fill: false,
        },
      ],
    };

    // dummy data for Topic Word Scores chart
    const topicWordScoresData = {
      labels: [
        "Topic 1",
        "Topic 2",
        "Topic 3",
        "Topic 4",
        "Topic 5",
        "Topic 6",
        "Topic 7",
        "Topic 8",
        "Topic 9",
        "Topic 10",
        "Topic 11",
        "Topic 12",
      ],
      datasets: [
        {
          label: "Topic Word Scores",
          data: [
            0.62, 0.55, 0.78, 0.68, 0.6, 0.75, 0.8, 0.7, 0.65, 0.72, 0.58, 0.63,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 205, 86, 0.6)",
          ],
        },
      ],
    };

    // destroy existing charts if they exist
    if (responseRatesChartRef.current) {
      responseRatesChartRef.current.destroy();
    }
    if (coherenceScoresChartRef.current) {
      coherenceScoresChartRef.current.destroy();
    }
    if (topicWordScoresChartRef.current) {
      topicWordScoresChartRef.current.destroy();
    }

    // create new charts
    if (responseRatesRef.current) {
      responseRatesChartRef.current = new Chart(responseRatesRef.current, {
        type: "bar",
        data: responseRatesData,
      });
    }
    if (coherenceScoresRef.current) {
      coherenceScoresChartRef.current = new Chart(coherenceScoresRef.current, {
        type: "line",
        data: coherenceScoresData,
      });
    }
    if (topicWordScoresRef.current) {
      topicWordScoresChartRef.current = new Chart(topicWordScoresRef.current, {
        type: "bar",
        data: topicWordScoresData,
      });
    }
  };

  useEffect(() => {
    if (activeTab === "analytics") {
      initializeCharts();
    }

    // destroy charts on unmount
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
              <img src={ALEC_LOGO} alt="Logo 1" className="h-12 mr-4" />
              <img src={SMART_LOGO} alt="Logo 2" className="h-12" />
            </div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <p className="mb-4">Number of contributors: 20</p>
            <p className="mb-4">Questions:</p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Q1: Considering the IoT connected heavy equipment presented in
                this document, what would you do to compromise the data
                collected?
              </li>
              <li>
                Q2: Considering the IoT connected heavy equipment presented in
                this document, what would you do to compromise the operation?
              </li>
              <li>
                Q3: In your opinion, what are the most vulnerable components?
                Why?
              </li>
              <li>
                Q4: What modifications would you suggest to make the system less
                vulnerable?
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium mb-2">
                  Response Rates for Questions
                </h2>
                <canvas ref={responseRatesRef} />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2">
                  Coherence Scores by Segmentation Method
                </h2>
                <canvas ref={coherenceScoresRef} />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium mb-2">Topic Word Scores</h2>
              <canvas ref={topicWordScoresRef} />
            </div>
          </TabsContent>
          <TabsContent value="summaries">
            <div className="flex justify-center mb-6">
              <img src={ALEC_LOGO} alt="Logo 1" className="h-12 mr-4" />
              <img src={SMART_LOGO} alt="Logo 2" className="h-12" />
            </div>
            <Summaries />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
