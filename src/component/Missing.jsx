import { Link } from 'react-router-dom';

const boxStyle = {
  border: '2px solid #6c757d',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
};

const headingStyle = {
  textAlign: 'center',
  color: '#6c757d',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #6c757d',
  paddingBottom: '0.5rem',
};

const linkStyle = {
  display: 'block',
  padding: '0.75rem',
  backgroundColor: '#6c757d',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
  marginTop: '1rem',
};

function Missing() {
  return (
    <div style={boxStyle}>
      <h1 style={headingStyle}>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Missing;