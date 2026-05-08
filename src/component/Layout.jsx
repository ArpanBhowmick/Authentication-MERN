import { Outlet, Link } from 'react-router-dom';

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  padding: '1rem',
  backgroundColor: '#f8f9fa',
  borderBottom: '2px solid #dee2e6',
  marginBottom: '2rem',
};

const publicStyle = { color: '#28a745', fontWeight: 'bold' };
const privateStyle = { color: '#dc3545', fontWeight: 'bold' };

function Layout() {
  return (
    <div className="layout">
      <nav style={navStyle}>
        <div>
          <h3 style={publicStyle}>Public Routes</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/linkpage">Linkpage</Link></li>
            <li><Link to="/unauthorized">Unauthorized</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/missing">Missing</Link></li>
          </ul>
        </div>
        <div>
          <h3 style={privateStyle}>Private Routes</h3>
          <ul>
            <li><Link to="/editor">Editor</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/lounge">Lounge</Link></li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;