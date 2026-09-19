import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import CourseHeader from "../components/CourseHeader";
import Footer from "../components/Footer";
import "./Course.css";

function Courses() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("search") || "").trim().toLowerCase();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("/api/courses", { signal: controller.signal })
      .then((res) => {
        setCourses(res.data.courses || []);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error("Error in retrieving courses", err);
        setError("Failed to load courses");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const filteredCourses = query
    ? courses.filter((course) => course.title?.toLowerCase().includes(query))
    : courses;

  const renderStars = (rating) => {
    const stars = Math.min(5, Math.max(0, Math.round(rating) || 0));
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div>
      <CourseHeader />
      <section className="courses-page">
        <h2 className="courses-title">
          {query ? `Search results for "${query}"` : "Explore Our Courses"}
        </h2>

        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredCourses.length === 0 ? (
          <p>No courses found matching your search.</p>
        ) : (
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <Link
                to={`/courses/${course._id}`}
                className="course-card-link"
                key={course._id}
              >
                <div className="course-card">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="course-image"
                  />
                  <div className="course-info">
                    <span className="course-provider">{course.provider}</span>
                    <h3 className="course-title">{course.title}</h3>
                    <div className="course-rating">
                      {renderStars(course.rating)}
                      <span className="rating-number"> {course.rating}</span>
                    </div>
                    <p className="course-duration">{course.duration}</p>
                    <p className="course-price">{course.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Courses;
