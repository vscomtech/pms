import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Form, 
  Button,
  Table,
  Badge
} from 'react-bootstrap';
import { 
  FaChartBar, 
  FaChartLine, 
  FaChartPie, 
  FaDownload,
  FaCalendarAlt,
  FaFilter,
  FaProjectDiagram,
  FaUsers,
  FaDollarSign,
  FaClock
} from 'react-icons/fa';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('project');
  const [dateRange, setDateRange] = useState('month');

  const projectData = [
    { name: 'E-commerce Platform', progress: 75, budget: 50000, spent: 37500, team: 5 },
    { name: 'Mobile App Development', progress: 25, budget: 30000, spent: 7500, team: 3 },
    { name: 'CRM System', progress: 90, budget: 25000, spent: 22500, team: 4 },
    { name: 'Reporting System', progress: 60, budget: 20000, spent: 12000, team: 3 }
  ];

  const taskData = [
    { status: 'Completed', count: 128, percentage: 45 },
    { status: 'In Progress', count: 45, percentage: 16 },
    { status: 'Testing', count: 32, percentage: 11 },
    { status: 'Planning', count: 78, percentage: 28 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, invoices: 8 },
    { month: 'Feb', revenue: 52000, invoices: 10 },
    { month: 'Mar', revenue: 38000, invoices: 7 },
    { month: 'Apr', revenue: 61000, invoices: 12 },
    { month: 'May', revenue: 49000, invoices: 9 },
    { month: 'Jun', revenue: 55000, invoices: 11 }
  ];

  const teamPerformance = [
    { name: 'John Doe', tasks: 25, hours: 180, efficiency: 95 },
    { name: 'Jane Smith', tasks: 22, hours: 165, efficiency: 88 },
    { name: 'Mike Johnson', tasks: 28, hours: 200, efficiency: 92 },
    { name: 'Sarah Wilson', tasks: 20, hours: 150, efficiency: 85 },
    { name: 'David Brown', tasks: 30, hours: 220, efficiency: 98 }
  ];

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'success';
    if (efficiency >= 80) return 'warning';
    return 'danger';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const ProjectProgressChart = () => (
    <div className="mb-4">
      {projectData.map((project, index) => (
        <div key={index} className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">{project.name}</h6>
            <span className="text-muted">{project.progress}%</span>
          </div>
          <div className="progress mb-2" style={{ height: '8px' }}>
            <div 
              className="progress-bar" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <div className="d-flex justify-content-between text-muted small">
            <span>Budget: {formatCurrency(project.budget)}</span>
            <span>Spent: {formatCurrency(project.spent)}</span>
            <span>Team: {project.team} members</span>
          </div>
        </div>
      ))}
    </div>
  );

  const TaskStatusChart = () => (
    <div className="mb-4">
      {taskData.map((task, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="fw-medium">{task.status}</span>
              <span className="text-muted">{task.count} tasks</span>
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div 
                className="progress-bar" 
                style={{ width: `${task.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const RevenueChart = () => (
    <div className="mb-4">
      {revenueData.map((data, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <div className="me-3 text-center" style={{ width: '60px' }}>
            <div className="fw-bold">{data.month}</div>
            <small className="text-muted">{data.invoices} invoices</small>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="fw-medium">{formatCurrency(data.revenue)}</span>
              <span className="text-muted">{data.invoices} invoices</span>
            </div>
            <div className="progress" style={{ height: '6px' }}>
              <div 
                className="progress-bar" 
                style={{ width: `${(data.revenue / 61000) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaChartBar className="me-2" />
          Reports & Analytics
        </h2>
        <div className="d-flex gap-2">
          <Form.Select 
            value={selectedReport} 
            onChange={(e) => setSelectedReport(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="project">Project Reports</option>
            <option value="task">Task Reports</option>
            <option value="revenue">Revenue Reports</option>
            <option value="team">Team Performance</option>
          </Form.Select>
          <Form.Select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </Form.Select>
          <Button variant="outline-primary">
            <FaDownload className="me-2" />
            Export
          </Button>
        </div>
      </div>

      <Row>
        {/* Summary Cards */}
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Total Projects</h6>
                  <h3 className="mb-1">12</h3>
                  <small className="opacity-75">+2 this month</small>
                </div>
                <div className="fs-1 opacity-75">
                  <FaProjectDiagram />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card-secondary h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Active Tasks</h6>
                  <h3 className="mb-1">45</h3>
                  <small className="opacity-75">+5 this week</small>
                </div>
                <div className="fs-1 opacity-75">
                  <FaClock />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card-success h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Team Members</h6>
                  <h3 className="mb-1">8</h3>
                  <small className="opacity-75">+1 this month</small>
                </div>
                <div className="fs-1 opacity-75">
                  <FaUsers />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="stat-card-warning h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">Total Revenue</h6>
                  <h3 className="mb-1">$300K</h3>
                  <small className="opacity-75">+15% this quarter</small>
                </div>
                <div className="fs-1 opacity-75">
                  <FaDollarSign />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Main Report Content */}
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Header>
              <h6 className="mb-0">
                {selectedReport === 'project' && <FaProjectDiagram className="me-2" />}
                {selectedReport === 'task' && <FaClock className="me-2" />}
                {selectedReport === 'revenue' && <FaDollarSign className="me-2" />}
                {selectedReport === 'team' && <FaUsers className="me-2" />}
                {selectedReport === 'project' && 'Project Progress Report'}
                {selectedReport === 'task' && 'Task Status Report'}
                {selectedReport === 'revenue' && 'Revenue Report'}
                {selectedReport === 'team' && 'Team Performance Report'}
              </h6>
            </Card.Header>
            <Card.Body>
              {selectedReport === 'project' && <ProjectProgressChart />}
              {selectedReport === 'task' && <TaskStatusChart />}
              {selectedReport === 'revenue' && <RevenueChart />}
              {selectedReport === 'team' && (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Team Member</th>
                      <th>Tasks Completed</th>
                      <th>Hours Worked</th>
                      <th>Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamPerformance.map((member, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{member.name}</strong>
                        </td>
                        <td>{member.tasks}</td>
                        <td>{member.hours}h</td>
                        <td>
                          <Badge bg={getEfficiencyColor(member.efficiency)}>
                            {member.efficiency}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Header>
              <h6 className="mb-0">
                <FaFilter className="me-2" />
                Quick Filters
              </h6>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Date Range</Form.Label>
                <Form.Select 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Project Filter</Form.Label>
                <Form.Select>
                  <option value="">All Projects</option>
                  <option value="ecommerce">E-commerce Platform</option>
                  <option value="mobile">Mobile App Development</option>
                  <option value="crm">CRM System</option>
                  <option value="reporting">Reporting System</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Team Member</Form.Label>
                <Form.Select>
                  <option value="">All Members</option>
                  <option value="john">John Doe</option>
                  <option value="jane">Jane Smith</option>
                  <option value="mike">Mike Johnson</option>
                  <option value="sarah">Sarah Wilson</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" className="w-100">
                Apply Filters
              </Button>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h6 className="mb-0">
                <FaChartPie className="me-2" />
                Quick Stats
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Completion Rate</span>
                  <span className="fw-bold">85%</span>
                </div>
                <div className="progress mt-1" style={{ height: '6px' }}>
                  <div className="progress-bar" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Budget Utilization</span>
                  <span className="fw-bold">72%</span>
                </div>
                <div className="progress mt-1" style={{ height: '6px' }}>
                  <div className="progress-bar bg-warning" style={{ width: '72%' }}></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Team Efficiency</span>
                  <span className="fw-bold">91%</span>
                </div>
                <div className="progress mt-1" style={{ height: '6px' }}>
                  <div className="progress-bar bg-success" style={{ width: '91%' }}></div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between">
                  <span>Client Satisfaction</span>
                  <span className="fw-bold">4.8/5</span>
                </div>
                <div className="progress mt-1" style={{ height: '6px' }}>
                  <div className="progress-bar bg-info" style={{ width: '96%' }}></div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports; 