import { Link } from 'react-router-dom';

const boxStyle = {
  border: '2px solid #6f42c1',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
};

const headingStyle = {
  textAlign: 'center',
  color: '#6f42c1',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #6f42c1',
  paddingBottom: '0.5rem',
};

const linkStyle = {
  display: 'block',
  padding: '0.75rem',
  backgroundColor: '#6f42c1',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
  marginTop: '1rem',
};

function Admin() {
  return (
    <div style={boxStyle}>
      <h1 style={headingStyle}>Admin Page</h1>
      <p>This is a private route. Only admins can access.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Admin;