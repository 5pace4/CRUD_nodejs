import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>About This Application</h1>
      <p>
        This is a simple<strong>User Management System</strong> built using{' '}
        <strong>React.js</strong> for the frontend and{' '}
        <strong>Node.js with Express</strong> for the backend. The application
        also uses <strong>MongoDB</strong> for storing user data.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Create, Read, Update, and Delete (CRUD) user data</li>
        <li>View detailed user information</li>
        <li>Responsive and user-friendly UI</li>
        <li>Data stored in MongoDB</li>
      </ul>
      <h2>Technologies Used</h2>
      <div className="tech-list">
        <span>React.js</span>
        <span>Node.js</span>
        <span>Express.js</span>
        <span>MongoDB</span>
        <span>Axios</span>
        <span>React Router</span>
        <span>Toast Notifications</span>
      </div>
      <h2>Backend Code Repository</h2>
      <p>
        The backend code for this application is available in a separate repository. You can find it here: 
        <a href="https://github.com/5pace4/software-architecture_CSE-489/tree/main/rest_api" target="_blank" rel="noopener noreferrer">
          Backend Code Repository
        </a>.
      </p>
    </div>
  );
}
