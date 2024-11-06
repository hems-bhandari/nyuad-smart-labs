import { useEffect, useState } from "react";
import axios from "axios";

interface Summary {
  topic_id: number;
  label: string;
  keywords: string;
  representative_documents: string;
}

const Summaries = () => {
  const [summaries, setSummaries] = useState<Summary[]>([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await axios.get("/api/topic-summaries/");
        setSummaries(response.data);
      } catch (error) {
        console.error("Error fetching topic summaries:", error);
      }
    };

    fetchSummaries();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Topic Summaries</h2>
      {summaries.map((summary) => (
        <div key={summary.topic_id} className="mt-4">
          <h3 className="text-md font-bold">Topic {summary.topic_id}</h3>
          <p className="text-gray-600">{summary.label}</p>
          <p className="text-gray-600">{summary.keywords}</p>
          <p className="text-gray-600">{summary.representative_documents}</p>
        </div>
      ))}
    </div>
  );
};

export default Summaries;