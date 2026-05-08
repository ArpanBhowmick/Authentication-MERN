import { Link } from 'react-router-dom';

const boxStyle = {
  border: '2px solid #ffc107',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
};

const headingStyle = {
  textAlign: 'center',
  color: '#ffc107',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #ffc107',
  paddingBottom: '0.5rem',
};

const linkStyle = {
  display: 'block',
  padding: '0.75rem',
  backgroundColor: '#ffc107',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
  marginTop: '1rem',
};

function Editor() {
  return (
    <div style={boxStyle}>
      <h1 style={headingStyle}>Editor Page</h1>
      <p>This is a private route. Only authorized users can access.</p>
      <Link to="/" style={linkStyle}>Back to Home</Link>
    </div>
  );
}

export default Editor;