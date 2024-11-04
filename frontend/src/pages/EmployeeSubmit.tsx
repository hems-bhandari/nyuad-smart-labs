import React, { useState } from "react";
import { HMR_LOGO, Q1_LINK, Q2_LINK } from "@/constants";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import "@/styles/EmployeeSubmit.css";
import api from "@/api";
import { WordCloudComponent } from '@/components/WordCloud';

const EmployeeSubmit = () => {
  const [questions, setQuestions] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "1",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [words, setWords] = useState<{ text: string; value: number }[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form", questions);
    try {
      const response = await api.post("/api/submissions/", {
        a1: questions.q1,
        a2: questions.q2,
        a3: questions.q3,
        a4: questions.q4,
        a5: questions.q5,
        a6: questions.q6,
      });

      if (response.status === 201) {
        console.log("Form Submitted", questions);

        const answers = [
          questions.q1,
          questions.q2,
          questions.q3,
          questions.q4,
          questions.q5,
        ].filter(answer => answer.trim() !== "");

        const concatenatedAnswers = answers.join(' ');

        const wordCounts = concatenatedAnswers
          .split(/\s+/)
          .reduce((acc: { [key: string]: number }, word: string) => {
            if (word.trim() !== "") {
              acc[word] = (acc[word] || 0) + 1;
            }
            return acc;
          }, {});

        const wordsArray = Object.entries(wordCounts).map(([text, value]) => ({ text, value }));

        console.log("Words data:", wordsArray);
        setWords(wordsArray);

        setQuestions({ q1: "", q2: "", q3: "", q4: "", q5: "", q6: "1" });
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/employee/dashboard/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded">
        <div className="flex justify-center mb-6">
          <img src={HMR_LOGO} alt="HMR Logo" className="h-12" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Submit Your Response</h1>
        <h2 className="text-l font-semibold mb-4">
          Following are the questions for the “Hack my Robot” Challenge, part of CSAW MENA. Please answer them considering the provided robotic system representing an autonomous excavator.
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold mb-1">
              Considering the robotic system presented in &nbsp;
              <a href={Q1_LINK} className="text-blue-500 underline">
                this document
              </a>, what would you do to compromise the data collected?
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={questions.q1}
              onChange={(e) => setQuestions({ ...questions, q1: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">
              Considering the robotic system presented in &nbsp;
              <a href={Q2_LINK} className="text-blue-500 underline">
                this document
              </a>, what would you do to compromise the operation?
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={questions.q2}
              onChange={(e) => setQuestions({ ...questions, q2: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">In your opinion, what are the most vulnerable components? why?</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={questions.q3}
              onChange={(e) => setQuestions({ ...questions, q3: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">What modifications would you suggest to make the system less vulnerable?</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={questions.q4}
              onChange={(e) => setQuestions({ ...questions, q4: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">What would be your motivation to compromise the described robotic system? Consider the characteristics of the environment where the robot operates and the potential impacts of such compromise on the business processes/continuity.</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              value={questions.q5}
              onChange={(e) => setQuestions({ ...questions, q5: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">
              On a scale of 1 to 5, how would you rate your cybersecurity expertise?
            </label>
            <p className="text-sm mb-2">
              <Popover>
                <PopoverTrigger><u><i>How to assess your level?</i></u></PopoverTrigger>
                <PopoverContent>
                  1: Novice - Limited or no exposure to cybersecurity beyond basic IT tasks.<br />
                  2: Advanced Beginner - Familiar with fundamental concepts and practices but not heavily involved in cybersecurity decision-making.<br />
                  3: Competent - Capable of handling routine cybersecurity tasks as part of IT operations.<br />
                  4: Proficient - Regularly applies advanced cybersecurity strategies, with a strong understanding of security principles.<br />
                  5: Expert - Deep expertise and experience in defending systems, networks, and applications against sophisticated threats.
                </PopoverContent>
              </Popover>
            </p>
            <Slider
              className="w-full"
              defaultValue={[1]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => {
                console.log("Slider value changed:", value);
                setQuestions({ ...questions, q6: value[0].toString() });
              }}
              value={[parseInt(questions.q6)]}
            />
            <div className="flex justify-between mt-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-button" onClick={handleClosePopup}>&times;</span>
            <p>Your response was recorded!</p>
            <WordCloudComponent words={words} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSubmit;
