import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import NotFound from "@/pages/NotFound"
import ProtectedRoute from "@/components/ProtectedRoute"
import EmployeeDashboard from "@/pages/EmployeeDashboard"
import EmployeeSubmit from "@/pages/EmployeeSubmit"
import EmployeeSubmissions from "./pages/EmployeeSubmissions"
import Landing from "@/pages/Landing"
import ManagerDashboard from "./pages/ManagerDashboard"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/submit"
          element={
            <ProtectedRoute>
              <EmployeeSubmit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/submissions"
          element={
            <ProtectedRoute>
              <EmployeeSubmissions />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="manager/dashboard" element={<ManagerDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


{/*   
  1. change the content/logos [Submit a Response for Hack Ny Robot]
  2. load csv files to database
  3. implement models
  4. 
*/}