import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const fetchStudents = () => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addStudent = () => {
    if (!name || !age) {
      alert("Enter all fields");
      return;
    }

    axios.post("http://localhost:5000/students", { name, age })
      .then(() => {
        setName("");
        setAge("");
        fetchStudents();
      });
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/students/${id}`)
      .then(() => fetchStudents());
  };

  return (
    <div className="container">
      <h2>🎓 Student Manager</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button className="add-btn" onClick={addStudent}>
        ➕ Add Student
      </button>

      <ul className="student-list">
        {students.map((student) => (
          <li key={student._id} className="student-item">
            <span>{student.name} ({student.age})</span>

            <button
              className="delete-btn"
              onClick={() => deleteStudent(student._id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;