import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { 
  FaProjectDiagram, 
  FaTasks, 
  FaCheckCircle, 
  FaFileInvoiceDollar,
  FaMoneyBill,
  FaChartLine,
  FaCalendarAlt
} from 'react-icons/fa';

const Dashboard = () => {
  console.log('Dashboard component rendered');
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log('Dashboard component mounted');
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  const stats = [
    {
      title: 'Total Projects',
      value: '12',
      icon: FaProjectDiagram,
      color: 'stat-card',
      change: '+2 this month'
    },
    {
      title: 'Ongoing Tasks',
      value: '45',
      icon: FaTasks,
      color: 'stat-card-secondary',
      change: '+5 this week'
    },
    {
      title: 'Completed Tasks',
      value: '128',
      icon: FaCheckCircle,
      color: 'stat-card-success',
      change: '+12 this month'
    },
    {
      title: 'Pending Invoices',
      value: '8',
      icon: FaMoneyBill ,
      color: 'stat-card-warning',
      change: '-3 this week'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      status: 'In Progress',
      progress: 75,
      team: '5 members',
      deadline: '2024-02-15'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      status: 'Planning',
      progress: 25,
      team: '3 members',
      deadline: '2024-03-01'
    },
    {
      id: 3,
      name: 'CRM System',
      status: 'Testing',
      progress: 90,
      team: '4 members',
      deadline: '2024-01-30'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Database Optimization',
      project: 'E-commerce Platform',
      assigned: 'John Doe',
      due: '2024-01-20',
      priority: 'High'
    },
    {
      id: 2,
      title: 'UI/UX Design Review',
      project: 'Mobile App Development',
      assigned: 'Jane Smith',
      due: '2024-01-22',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'API Integration',
      project: 'CRM System',
      assigned: 'Mike Johnson',
      due: '2024-01-25',
      priority: 'High'
    }
  ];

  const getPriorityBadge = (priority) => {
    const colors = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'success'
    };
    return <span className={`badge bg-${colors[priority]}`}>{priority}</span>;
  };

  const getStatusBadge = (status) => {
    const colors = {
      'In Progress': 'primary',
      'Planning': 'info',
      'Testing': 'warning',
      'Completed': 'success'
    };
    return <span className={`badge bg-${colors[status]}`}>{status}</span>;
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Loading Dashboard...</h5>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaChartLine className="me-2" />
          Dashboard
        </h2>
        <div className="text-muted">
          <FaCalendarAlt className="me-1" />
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} lg={3} md={6} className="mb-3">
            <Card className={`${stat.color} h-100`}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-1">{stat.title}</h6>
                    <h3 className="mb-1">{stat.value}</h3>
                    <small className="opacity-75">{stat.change}</small>
                  </div>
                  <div className="fs-1 opacity-75">
                    <stat.icon />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        {/* Recent Projects */}
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaProjectDiagram className="me-2" />
                Recent Projects
              </h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Team</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <div>
                          <strong>{project.name}</strong>
                          <br />
                          <small className="text-muted">Due: {project.deadline}</small>
                        </div>
                      </td>
                      <td>{getStatusBadge(project.status)}</td>
                      <td>
                        <div className="progress" style={{ height: '6px' }}>
                          <div 
                            className="progress-bar" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <small>{project.progress}%</small>
                      </td>
                      <td>{project.team}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Upcoming Tasks */}
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaTasks className="me-2" />
                Upcoming Tasks
              </h5>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Project</th>
                    <th>Assigned</th>
                    <th>Priority</th>
                    <th>Due</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingTasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <strong>{task.title}</strong>
                      </td>
                      <td>{task.project}</td>
                      <td>{task.assigned}</td>
                      <td>{getPriorityBadge(task.priority)}</td>
                      <td>{task.due}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 