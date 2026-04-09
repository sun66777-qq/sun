import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import CourseDetail from "@/pages/CourseDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}
