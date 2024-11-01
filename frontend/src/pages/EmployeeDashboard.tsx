import { Link } from "react-router-dom";
import { ALEC_LOGO, SMART_LOGO } from "@/constants";

const EmployeeDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded">
        <div className="flex justify-between items-center mb-6">
          <img src={ALEC_LOGO} alt="Logo 1" className="h-12" />
          <img src={SMART_LOGO} alt="Logo 2" className="h-12" />
        </div>
        <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Submit a Response</h2>
              <p className="text-gray-600">
                Fill out a new submission and answer the required questions.
              </p>
            </div>
            <Link
              to="/employee/submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go to Submit Page
            </Link>
          </div>

          <div className="bg-green-50 p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">View/Edit/Delete Submissions</h2>
              <p className="text-gray-600">
                View all your past submissions, edit or delete them.
              </p>
            </div>
            <Link
              to="/employee/submissions"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Go to Submissions Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
