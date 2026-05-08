import { Link } from 'react-router-dom';

const boxStyle = {
  border: '2px solid #20c997',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
};

const headingStyle = {
  textAlign: 'center',
  color: '#20c997',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #20c997',
  paddingBottom: '0.5rem',
};

const linkStyle = {
  display: 'block',
  padding: '0.75rem',
  backgroundColor: '#20c997',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
  marginTop: '1rem',
};

function Login() {
  return (
    <div style={boxStyle}>
      <h1 style={headingStyle}>Login</h1>
      <p>Please login to access private routes.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Login;