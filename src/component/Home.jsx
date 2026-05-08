import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import UsersList from './UsersList';

const boxStyle = {
  border: '2px solid #007bff',
  borderRadius: '8px',
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#f8f9fa',
};

const headingStyle = {
  textAlign: 'center',
  color: '#007bff',
  marginBottom: '1.5rem',
  borderBottom: '2px solid #007bff',
  paddingBottom: '0.5rem',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const linkStyle = {
  display: 'block',
  padding: '0.75rem',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '4px',
  textAlign: 'center',
};

function Home() {
  return (
    <div style={boxStyle}>
      <h1 style={headingStyle}>Home Page</h1>
      <nav>
        <h2>Navigation</h2>
        <ul style={listStyle}>
          <li><Link to="/linkpage" style={linkStyle}>Linkpage</Link></li>
          <li><Link to="/unauthorized" style={linkStyle}>Unauthorized</Link></li>
          <li><Link to="/login" style={linkStyle}>Login</Link></li>
          <li><Link to="/register" style={linkStyle}>Register</Link></li>
          <li><Link to="/editor" style={linkStyle}>Editor</Link></li>
          <li><Link to="/admin" style={linkStyle}>Admin</Link></li>
          <li><Link to="/lounge" style={linkStyle}>Lounge</Link></li>
          <li><Link to="/missing" style={linkStyle}>Missing</Link></li>
        </ul>
      </nav>
      <UsersList/>
    </div>
  );
}

export default Home;