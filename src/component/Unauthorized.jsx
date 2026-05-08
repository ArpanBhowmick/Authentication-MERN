import { Link } from 'react-router-dom';

const boxStyle = {
  border: '2px solid #dc3545',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
};

const headingStyle = {
  textAlign: 'center',
  color: '#dc3545',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #dc3545',
  paddingBottom: '0.5rem',
};

const linkStyle = {
  display: 'block',
  padding: '0.75rem',
  backgroundColor: '#dc3545',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
  marginTop: '1rem',
};

function Unauthorized() {
  return (
    <div style={boxStyle}>
      <h1 style={headingStyle}>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Unauthorized;