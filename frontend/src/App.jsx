import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseDetails from "./pages/CourseDetails";
import CourseLearning from "./pages/CourseLearning";
import ProtectedRoute from "./components/ProtectedRoute";
import Assignments from "./pages/Assignments";
import AssignmentDetails from "./pages/AssignmentDetails";
import InstructorAssignments from "./pages/InstructorAssignments";
import CreateAssignment from "./pages/CreateAssignment";
import AssignmentSubmissions from "./pages/AssignmentSubmissions";
import ReviewSubmission from "./pages/ReviewSubmission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route
          path="/learning/:courseId"
          element={
            <ProtectedRoute>
              <CourseLearning />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/learning/:courseId/assignments" 
          element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning/:courseId/assignments/:assignmentId"
          element={
            <ProtectedRoute>
              <AssignmentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/assignments"
          element={
            <ProtectedRoute>
              <InstructorAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/assignments/create"
          element={
            <ProtectedRoute>
              <CreateAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/assignments/:assignmentId/submissions"
          element={
            <ProtectedRoute>
              <AssignmentSubmissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/submissions/:submissionId/review"
          element={
            <ProtectedRoute>
              <ReviewSubmission />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
