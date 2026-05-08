import { Link } from 'react-router-dom';

const boxStyle = {
  border: '2px solid #fd7e14',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
};

const headingStyle = {
  textAlign: 'center',
  color: '#fd7e14',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #fd7e14',
  paddingBottom: '0.5rem',
};

const linkStyle = {
  display: 'block',
  padding: '0.75rem',
  backgroundColor: '#fd7e14',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
  marginTop: '1rem',
};

function Register() {
  return (
    <div style={boxStyle}>
      <h1 style={headingStyle}>Register</h1>
      <p>Create an account to get started.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Register;