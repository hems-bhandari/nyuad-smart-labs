import { useState, useEffect } from "react";
import { HMR_LOGO } from "@/constants";
// import { ALEC_LOGO, SMART_LOGO } from "@/constants";
import api from "@/api"; // Import the api module

interface Submission {
  id: number;
  a1: string;
  a2: string;
  a3: string;
  a4: string;
  a5: string;
  a6: string;
  created_at: string;
  lastEditedAt: string | null;
}

const EmployeeSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newAnswers, setNewAnswers] = useState({
    a1: "",
    a2: "",
    a3: "",
    a4: "",
    a5: "",
    a6: "",
  });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await api.get("/api/submissions/");
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions", error);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/submissions/${id}/`);
      setSubmissions(submissions.filter((submission) => submission.id !== id));
    } catch (error) {
      console.error("Error deleting submission", error);
    }
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    const submissionToEdit = submissions.find((submission) => submission.id === id);
    if (submissionToEdit) {
      setNewAnswers({
        a1: submissionToEdit.a1,
        a2: submissionToEdit.a2,
        a3: submissionToEdit.a3,
        a4: submissionToEdit.a4,
        a5: submissionToEdit.a5,
        a6: submissionToEdit.a6,
      });
    }
    console.log("Editing submission", submissionToEdit);
  };

  const handleSave = async (id: number) => {
    try {
      const response = await api.put(`/api/submissions/${id}/`, newAnswers);
      const updatedSubmission = response.data;
      setSubmissions(submissions.map((submission) => (submission.id === id ? updatedSubmission : submission)));
      setEditingId(null);
    } catch (error) {
      console.error("Error saving submission", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded">
        <div className="flex justify-center mb-6">
          {/* <img src={ALEC_LOGO} alt="Logo 1" className="h-12 mr-4" />
          <img src={SMART_LOGO} alt="Logo 2" className="h-12" /> */}
          <img src={HMR_LOGO} alt="Logo 2" className="h-12" />
        </div>
        <h1 className="text-2xl font-bold mb-6">Your Submissions</h1>

        {submissions.length === 0 ? (
          <p className="text-gray-500">You have no submissions yet.</p>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Submission {submission.id}</h2>

                {/* Submission questions */}
                <div className="space-y-2">
                  <div>
                    <label className="font-bold">Q1:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.a1}
                        onChange={(e) => setNewAnswers({ ...newAnswers, a1: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-800">{submission.a1}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold">Q2:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.a2}
                        onChange={(e) => setNewAnswers({ ...newAnswers, a2: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-800">{submission.a2}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold">Q3:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.a3}
                        onChange={(e) => setNewAnswers({ ...newAnswers, a3: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-800">{submission.a3}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold">Q4:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.a4}
                        onChange={(e) => setNewAnswers({ ...newAnswers, a4: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-800">{submission.a4}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold">Q5:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.a5}
                        onChange={(e) => setNewAnswers({ ...newAnswers, a5: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-800">{submission.a5}</p>
                    )}
                  </div>

                  <div>
                    <label className="font-bold">Q6:</label>
                    {editingId === submission.id ? (
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded mb-2"
                        value={newAnswers.a6}
                        onChange={(e) => setNewAnswers({ ...newAnswers, a6: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-800">{submission.a6}</p>
                    )}
                  </div>
                </div>

                {/* Submission timestamps */}
                <p className="text-sm text-gray-500 mt-4">
                  Submitted on:{" "}
                  {new Date(submission.created_at).toLocaleString("en-US", {
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
                    {new Date(submission.lastEditedAt).toLocaleString("en-US", {
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
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this submission?")) {
                      handleDelete(submission.id);
                      }
                    }}
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
