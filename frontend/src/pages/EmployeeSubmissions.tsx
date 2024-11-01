import { useState } from "react";
import { ALEC_LOGO, SMART_LOGO } from "@/constants";

interface Submission {
  id: number;
  questions: {
    q1: string;
    q2: string;
    q3: string;
    q4: string;
  };
  submittedAt: Date;
  lastEditedAt: Date | null;
}

const EmployeeSubmissions = () => {
  // sample submission data
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      questions: {
        q1: "Answer to Q1 in submission 1",
        q2: "Answer to Q2 in submission 1",
        q3: "Answer to Q3 in submission 1",
        q4: "Answer to Q4 in submission 1",
      },
      submittedAt: new Date("2024-10-12T10:45:00"),
      lastEditedAt: new Date("2024-10-13T11:15:00"),
    },
    {
      id: 2,
      questions: {
        q1: "Answer to Q1 in submission 2",
        q2: "Answer to Q2 in submission 2",
        q3: "Answer to Q3 in submission 2",
        q4: "Answer to Q4 in submission 2",
      },
      submittedAt: new Date("2024-10-10T09:30:00"),
      lastEditedAt: null,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newAnswers, setNewAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });

  // delete submission
  const handleDelete = (id: number) => {
    const updatedSubmissions = submissions.filter(
      (submission) => submission.id !== id
    );
    setSubmissions(updatedSubmissions);
  };

  // edit submission
  const handleEdit = (id: number) => {
    setEditingId(id);
    const submissionToEdit = submissions.find((submission) => submission.id === id);
    if (submissionToEdit) {
      setNewAnswers(submissionToEdit.questions);
    }
  };

  // save edited submission
  const handleSave = (id: number) => {
    const updatedSubmissions = submissions.map((submission) => {
      if (submission.id === id) {
        return {
          ...submission,
          questions: newAnswers,
          lastEditedAt: new Date(), // update edit timestamp
        };
      }
      return submission;
    });
    setSubmissions(updatedSubmissions);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded">
      <div className="flex justify-center mb-6">
          <img src={ALEC_LOGO} alt="Logo 1" className="h-12 mr-4" />
          <img src={SMART_LOGO} alt="Logo 2" className="h-12" />
        </div>
        <h1 className="text-2xl font-bold mb-6">Your Submissions</h1>

        {submissions.length === 0 ? (
          <p className="text-gray-500">You have no submissions yet.</p>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">
                  Submission {submission.id}
                </h2>

                {/* Submission questions */}
                <div className="space-y-2">
                  <div>
                    <label className="font-bold">Q1:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.q1}
                        onChange={(e) =>
                          setNewAnswers({ ...newAnswers, q1: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-gray-800">{submission.questions.q1}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold">Q2:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.q2}
                        onChange={(e) =>
                          setNewAnswers({ ...newAnswers, q2: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-gray-800">{submission.questions.q2}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold">Q3:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.q3}
                        onChange={(e) =>
                          setNewAnswers({ ...newAnswers, q3: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-gray-800">{submission.questions.q3}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold">Q4:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.q4}
                        onChange={(e) =>
                          setNewAnswers({ ...newAnswers, q4: e.target.value })
                        }
                      />
                    ) : (
                      <p className="text-gray-800">{submission.questions.q4}</p>
                    )}
                  </div>
                </div>

                {/* Submission timestamps */}
                <p className="text-sm text-gray-500 mt-4">
                  Submitted on:{" "}
                  {submission.submittedAt.toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                {submission.lastEditedAt && (
                  <p className="text-sm text-gray-500">
                    Last edited on:{" "}
                    {submission.lastEditedAt.toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}

                {/* Edit/Delete buttons */}
                <div className="mt-4 flex space-x-4">
                  {editingId === submission.id ? (
                    <button
                      onClick={() => handleSave(submission.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(submission.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(submission.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeSubmissions;
