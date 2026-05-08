import { Link } from 'react-router-dom';

const boxStyle = {
  border: '2px solid #17a2b8',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
};

const headingStyle = {
  textAlign: 'center',
  color: '#17a2b8',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #17a2b8',
  paddingBottom: '0.5rem',
};

const linkStyle = {
  display: 'block',
  padding: '0.75rem',
  backgroundColor: '#17a2b8',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
  marginTop: '1rem',
};

function Lounge() {
  return (
    <div style={boxStyle}>
      <h1 style={headingStyle}>Lounge Page</h1>
      <p>This is a private route. Only authenticated users can access.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Lounge;