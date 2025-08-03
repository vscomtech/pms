import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaProjectDiagram, 
  FaCubes, 
  FaTasks, 
  FaFileInvoiceDollar, 
  FaSync, 
  FaChartBar,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa';

const Layout = ({ children, userRole, onLogout }) => {
  const location = useLocation();

  const navItems = userRole === 'project_manager' ? [
    { path: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { path: '/projects', icon: FaProjectDiagram, label: 'Projects' },
    { path: '/tasks', icon: FaTasks, label: 'Tasks' },
    { path: '/invoices', icon: FaFileInvoiceDollar, label: 'Invoices' },
    { path: '/tally-sync', icon: FaSync, label: 'Tally Sync' },
    // { path: '/reports', icon: FaChartBar, label: 'Reports' },
  ] : [
    { path: '/tasks', icon: FaTasks, label: 'Tasks' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar" style={{ width: '250px' }}>
        <div className="p-3">
          <h4 className="text-white fw-bold mb-4">
            <i className="fas fa-project-diagram me-2"></i>
            {userRole === 'project_manager' ? 'PMS' : 'TMS'}
          </h4>
        </div>
        
        <Nav className="flex-column px-3">
          {navItems.map((item) => (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={isActive(item.path) ? 'active' : ''}
            >
              <item.icon />
              {item.label}
            </Nav.Link>
          ))}
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <Navbar bg="white" expand="lg" className="border-bottom">
          <Container fluid>
            <Navbar.Brand href="#home" className="fw-bold">
              {userRole === 'project_manager' ? 'Project Management System' : 'Task Management System'}
            </Navbar.Brand>
            
            <Nav className="ms-auto">
              <Dropdown>
                <Dropdown.Toggle variant="light" className="d-flex align-items-center">
                  <div className="user-avatar me-2">
                    <FaUser />
                  </div>
                  <span className="me-2">
                    {userRole === 'project_manager' ? 'Project Manager' : 'User'}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <FaUser className="me-2" />
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={onLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>

        {/* Page Content */}
        <div className="main-content p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout; 