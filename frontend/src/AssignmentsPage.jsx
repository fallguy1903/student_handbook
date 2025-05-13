import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignmentsPage.css';

const AssignmentsPage = ({ username }) => {
    const [assignments, setAssignments] = useState([]);
    const [subjectId, setSubjectId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [completedAssignments, setCompletedAssignments] = useState({}); // { [assignmentId]: true, ... }

    const user = username;

    // Fetch all subjects
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:3000/subjects');
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, []);

    // Fetch completed assignments
    useEffect(() => {
        const fetchCompletedAssignments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/assignments/completed-assignments/${user}`);
                const completedData = response.data || { user, assignments: [] };
                const completedMap = {};
                completedData.assignments?.forEach(a => {
                    if (a && a.assignmentId) {
                        completedMap[a.assignmentId] = true;
                    }
                });
                setCompletedAssignments(completedMap);
            } catch (error) {
                console.error('Error fetching completed assignments:', error);
            }
        };
        fetchCompletedAssignments();
    }, [user]);

    // Fetch assignments for selected subject
    useEffect(() => {
        const fetchAssignments = async () => {
            if (!subjectId) return;
            try {
                const response = await axios.get(`http://localhost:3000/assignments/${subjectId}`);
                const uncompletedAssignments = response.data.filter(assignment => !completedAssignments[assignment._id]);
                setAssignments(uncompletedAssignments);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, [subjectId, completedAssignments]);

    // Handle creating new assignment
    const handleCreateAssignment = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            setErrorMessage('Title and description are required');
            return;
        }

        try {
            const newAssignment = {
                subjectId,
                title,
                description,
                dueDate: dueDate || null,
            };

            const response = await axios.post('http://localhost:3000/assignments/', newAssignment);
            setAssignments([...assignments, response.data]);
            setTitle('');
            setDescription('');
            setDueDate('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    };

    const markAsCompleted = async (assignmentId) => {
        try {
            await axios.post('http://localhost:3000/assignments/completed-assignments', {
                user,
                assignmentId,
            });
            setCompletedAssignments(prev => ({ ...prev, [assignmentId]: true }));
            setAssignments(assignments.filter(a => a._id !== assignmentId));
        } catch (error) {
            console.error('Error marking assignment as completed:', error);
        }
    };

    return (
        <div id="assignments-div" style={{ padding: '1rem' }}>
            {/* Assignment creation form */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'semibold', marginBottom: '1rem' }}>Create New Assignment</h2>
                <form onSubmit={handleCreateAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label htmlFor="subject" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', color: '#D1D5DB' }}>Subject</label>
                        <select
                            id="subject"
                            value={subjectId}
                            onChange={(e) => setSubjectId(e.target.value)}
                            className="w-full rounded border border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((subject) => (
                                <option key={subject._id} value={subject._id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="title" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', color: '#D1D5DB' }}>Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter assignment title"
                            required
                            className="w-full rounded border border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', color: '#D1D5DB' }}>Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter assignment description"
                            required
                            className="w-full rounded border border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="dueDate" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'medium', color: '#D1D5DB' }}>Due Date</label>
                        <input
                            id="dueDate"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full rounded border border-gray-700 bg-gray-800 text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {errorMessage && <p style={{ color: '#F44336', fontSize: '0.875rem' }}>{errorMessage}</p>}

                    <button id='createButton' type="submit" style={{ backgroundColor: '#3B82F6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.2s ease-in-out' }}>
                        Create Assignment
                    </button>
                </form>
            </div>

            {/* Assignments list */}
            <div className="assignment-item" style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 'semibold', marginBottom: '1rem' }}>Assignments List</h2>
                {assignments.length === 0 ? (
                    <p style={{ color: '#9CA3AF' }}>No assignments available for this subject.</p>
                ) : (
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyleType: 'none', padding: 0 }}>
                        {assignments.map((assignment) => {
                            const subject = subjects.find(sub => sub._id === assignment.subjectId);

                            return (
                                <li
                                    key={assignment._id}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid rgba(0, 0, 0, 0.28)',
                                        backgroundColor: 'rgba(213, 227, 232, 0.19)'
                                    }}
                                >
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'gray' }}>{assignment.title}</h2><br/>
                                    <p style={{ fontSize: '1.2rem', color: '#9CA3AF', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'medium' }}>Subject:</span> {subject ? subject.name : 'Unknown Subject'}
                                    </p>
                                    <p style={{ color: '#D1D5DB', marginBottom: '1rem' }}>{assignment.description}</p>
                                    {assignment.dueDate && (
                                        <p style={{ fontSize: '1.2rem', color: '#9CA3AF', marginBottom: '0.5rem' }}>
                                            <span style={{ fontWeight: 'medium' }}>Due Date:</span> {new Date(assignment.dueDate).toLocaleDateString()}
                                        </p>
                                    )}
                                    <button
                                        onClick={() => markAsCompleted(assignment._id)}
                                        style={{
                                            marginTop: '1rem',
                                            backgroundColor: 'rgba(74, 222, 128, 0.2)',
                                            color: '#4ADE80',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.375rem',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        Mark as Completed
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AssignmentsPage;