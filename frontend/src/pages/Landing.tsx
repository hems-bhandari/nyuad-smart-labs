import { Link } from "react-router-dom";
// import { ALEC_LOGO, SMART_LOGO } from "@/constants";
import { HMR_LOGO } from "@/constants";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex space-x-4">
            {/* <img
              src={ALEC_LOGO}
              alt="ALEC Logo"
              className="h-12 w-auto"
            />
            <img
              src={SMART_LOGO}
              alt="SMART Logo"
              className="h-12 w-auto"
            /> */}
            <img 
              src={HMR_LOGO}
              alt="HMR logo"
              className="h-12 w-auto"
            />
          </div>

          <Link
            to="/employee/dashboard"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to the Crowdsourcing Platform
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Together, let's make construction more secure!
        </p>

        <div className="flex space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Register
          </Link>
        </div>
      </main>

      <footer className="w-full bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} SMART Labs, NYU Abu Dhabi. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
