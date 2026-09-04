import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseDetails from "./pages/CourseDetails";
import CourseLearning from "./pages/CourseLearning";
import ProtectedRoute from "./components/ProtectedRoute";

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
      </Routes>
    </Router>
  );
}

export default App;
