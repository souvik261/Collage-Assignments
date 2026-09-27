import React, { useState } from 'react';
import './App.css';

// 1. Header Component
function Header({ title }) {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
}

// 2. Footer Component
function Footer({ text }) {
  return (
    <footer className="footer">
      <p>{text}</p>
    </footer>
  );
}

// 3. StudentCard Component (Receives individual student data via props)
function StudentCard({ student }) {
  const { name, rollNo, department, semester, cgpa, photo } = student;

  return (
    <div className="student-card">
      <div className="card-img-container">
        <img src={photo} alt={name} className="student-photo" />
      </div>
      <div className="card-body">
        <h3 className="student-name">{name}</h3>
        <p><strong>Roll No:</strong> {rollNo}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Semester:</strong> {semester}</p>
        <div className="cgpa-badge">CGPA: {cgpa}</div>
      </div>
    </div>
  );
}

// 4. StudentList Component (Receives students list via props and renders cards)
function StudentList({ students }) {
  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard key={student.rollNo} student={student} />
      ))}
    </div>
  );
}

// 5. Main App Component
function App() {
  const initialStudents = [
    {
      name: 'Aarav Sharma',
      rollNo: 'CS202301',
      department: 'Computer Science',
      semester: '4th',
      cgpa: 8.85,
      photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60'
    },
    {
      name: 'Ananya Roy',
      rollNo: 'IT202315',
      department: 'Information Technology',
      semester: '4th',
      cgpa: 9.42,
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60'
    },
    {
      name: 'Rohan Gupta',
      rollNo: 'EC202322',
      department: 'Electronics',
      semester: '4th',
      cgpa: 7.95,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60'
    },
    {
      name: 'Sneha Patel',
      rollNo: 'CS202340',
      department: 'Computer Science',
      semester: '4th',
      cgpa: 9.10,
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60'
    }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [isSortedDesc, setIsSortedDesc] = useState(false);

  // Sorting mechanism by CGPA
  const handleSortByCGPA = () => {
    const sortedList = [...students].sort((a, b) => {
      return isSortedDesc ? a.cgpa - b.cgpa : b.cgpa - a.cgpa;
    });

    setStudents(sortedList);
    setIsSortedDesc(!isSortedDesc);
  };

  return (
    <div className="app-container">
      <Header title="Student Information Portal" />

      <main className="main-content">
        <div className="controls">
          <button className="sort-btn" onClick={handleSortByCGPA}>
            {isSortedDesc ? 'Sort by CGPA (Low to High)' : 'Sort by CGPA (High to Low)'}
          </button>
        </div>

        <StudentList students={students} />
      </main>

      <Footer text="© 2026 Student Information Management System. All rights reserved." />
    </div>
  );
}

export default App;