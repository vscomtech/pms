import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Modal, 
  Form, 
  Badge,
  Row,
  Col,
  Dropdown
} from 'react-bootstrap';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaUser, 
  FaClock,
  FaTasks,
  FaPlay,
  FaCheck,
  FaRocket,
  FaEllipsisV,
  FaEye
} from 'react-icons/fa';

const TaskBoard = ({ userRole = 'user' }) => {
  console.log('TaskBoard component rendered with userRole:', userRole);
  
  useEffect(() => {
    console.log('TaskBoard component mounted');
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState({
    'In Progress': [
      {
        id: 1,
        title: 'Database Optimization',
        description: 'Optimize database queries and indexes for better performance',
        assignedTo: 'John Doe',
        hours: 8,
        priority: 'High',
        project: 'E-commerce Platform'
      },
      {
        id: 2,
        title: 'UI/UX Design Review',
        description: 'Review and approve the new user interface designs',
        assignedTo: 'Jane Smith',
        hours: 4,
        priority: 'Medium',
        project: 'Mobile App Development'
      }
    ],
    'Testing': [
      {
        id: 3,
        title: 'API Integration Testing',
        description: 'Test the payment gateway API integration',
        assignedTo: 'Mike Johnson',
        hours: 6,
        priority: 'High',
        project: 'E-commerce Platform'
      }
    ],
    'Done': [
      {
        id: 4,
        title: 'User Authentication Setup',
        description: 'Complete user login and registration system',
        assignedTo: 'Sarah Wilson',
        hours: 12,
        priority: 'High',
        project: 'CRM System'
      }
    ],
    'Deployment': [
      {
        id: 5,
        title: 'Production Deployment',
        description: 'Deploy the application to production servers',
        assignedTo: 'David Brown',
        hours: 3,
        priority: 'High',
        project: 'CRM System'
      }
    ]
  });

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    hours: '',
    priority: 'Medium',
    project: '',
    status: 'In Progress'
  });

  const teamMembers = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 
    'David Brown', 'Lisa Davis', 'Alex Turner', 'Emma White', 'Chris Lee'
  ];

  const projects = [
    'E-commerce Platform', 'Mobile App Development', 'CRM System', 
    'Reporting System', 'Payment Integration'
  ];

  const columns = [
    { key: 'In Progress', icon: FaPlay, color: 'primary' },
    { key: 'Testing', icon: FaTasks, color: 'warning' },
    { key: 'Done', icon: FaCheck, color: 'success' },
    { key: 'Deployment', icon: FaRocket, color: 'info' }
  ];

  const handleShowModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        hours: task.hours,
        priority: task.priority,
        project: task.project,
        status: task.status || 'In Progress'
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        hours: '',
        priority: 'Medium',
        project: '',
        status: 'In Progress'
      });
    }
    setShowModal(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      hours: task.hours,
      priority: task.priority,
      project: task.project,
      status: task.status || 'In Progress'
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      ...formData,
      hours: parseInt(formData.hours)
    };

    if (editingTask) {
      // Update existing task
      const newTasks = { ...tasks };
      Object.keys(newTasks).forEach(status => {
        newTasks[status] = newTasks[status].map(task => 
          task.id === editingTask.id ? newTask : task
        );
      });
      setTasks(newTasks);
    } else {
      // Add new task
      const newTasks = { ...tasks };
      if (!newTasks[formData.status]) {
        newTasks[formData.status] = [];
      }
      newTasks[formData.status].push(newTask);
      setTasks(newTasks);
    }
    
    setShowModal(false);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const newTasks = { ...tasks };
      Object.keys(newTasks).forEach(status => {
        newTasks[status] = newTasks[status].filter(task => task.id !== taskId);
      });
      setTasks(newTasks);
    }
  };

  const moveTask = (taskId, fromStatus, toStatus) => {
    const newTasks = { ...tasks };
    const task = newTasks[fromStatus].find(t => t.id === taskId);
    
    if (task) {
      newTasks[fromStatus] = newTasks[fromStatus].filter(t => t.id !== taskId);
      if (!newTasks[toStatus]) {
        newTasks[toStatus] = [];
      }
      newTasks[toStatus].push({ ...task, status: toStatus });
      setTasks(newTasks);
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      'High': 'danger',
      'Medium': 'warning',
      'Low': 'success'
    };
    return <Badge bg={colors[priority]}>{priority}</Badge>;
  };

  const TaskCard = ({ task, status }) => (
    <Card className="kanban-card mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title mb-1">{task.title}</h6>
          <Dropdown>
            <Dropdown.Toggle variant="light" size="sm">
              <FaEllipsisV />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {userRole === 'project_manager' ? (
                <>
                  <Dropdown.Item onClick={() => handleShowModal(task)}>
                    <FaEdit className="me-2" />
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(task.id)} className="text-danger">
                    <FaTrash className="me-2" />
                    Delete
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item onClick={() => handleShowModal(task)}>
                    <FaEye className="me-2" />
                    View Details
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleEditTask(task)}>
                    <FaEdit className="me-2" />
                    Edit Task
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
        <p className="card-text small text-muted mb-2">
          {task.description}
        </p>
        
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted">
            <FaUser className="me-1" />
            {task.assignedTo}
          </small>
          <small className="text-muted">
            <FaClock className="me-1" />
            {task.hours}h
          </small>
        </div>
        
        <div className="d-flex justify-content-between align-items-center">
          {getPriorityBadge(task.priority)}
          <small className="text-muted">{task.project}</small>
        </div>
      </Card.Body>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Loading Tasks...</h5>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaTasks className="me-2" />
          {userRole === 'project_manager' ? 'Task Board' : 'My Tasks'}
        </h2>
        {userRole === 'project_manager' && (
          <Button 
            variant="primary" 
            onClick={() => handleShowModal()}
          >
            <FaPlus className="me-2" />
            Add Task
          </Button>
        )}
      </div>

      <Row>
        {columns.map((column) => (
          <Col key={column.key} lg={3} md={6} className="mb-4">
            <Card className="kanban-column">
              <Card.Header className={`bg-${column.color} text-white`}>
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">
                    <column.icon className="me-2" />
                    {column.key}
                  </h6>
                  <Badge bg="light" text="dark">
                    {tasks[column.key]?.length || 0}
                  </Badge>
                </div>
              </Card.Header>
              <Card.Body>
                {tasks[column.key]?.map((task) => (
                  <TaskCard key={task.id} task={task} status={column.key} />
                ))}
                {(!tasks[column.key] || tasks[column.key].length === 0) && (
                  <div className="text-center text-muted py-4">
                    <FaTasks className="fs-1 mb-2" />
                    <p className="mb-0">No tasks</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Create/Edit Task Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingTask ? 'Edit Task' : (userRole === 'project_manager' ? 'Add New Task' : 'View Task Details')}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    readOnly={!editingTask && userRole !== 'project_manager'}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    {columns.map(col => (
                      <option key={col.key} value={col.key}>{col.key}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
                                <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    readOnly={!editingTask && userRole !== 'project_manager'}
                    required
                  />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                    disabled={!editingTask && userRole !== 'project_manager'}
                    required
                  >
                    <option value="">Select Member</option>
                    {teamMembers.map((member) => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Project</Form.Label>
                  <Form.Select
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    disabled={!editingTask && userRole !== 'project_manager'}
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    disabled={!editingTask && userRole !== 'project_manager'}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Estimated Hours</Form.Label>
                                <Form.Control
                    type="number"
                    min="1"
                    value={formData.hours}
                    onChange={(e) => setFormData({...formData, hours: e.target.value})}
                    readOnly={!editingTask && userRole !== 'project_manager'}
                    required
                  />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              {!editingTask && userRole !== 'project_manager' ? 'Close' : 'Cancel'}
            </Button>
            {(editingTask || userRole === 'project_manager') && (
              <Button variant="primary" type="submit">
                {editingTask ? 'Update Task' : 'Add Task'}
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskBoard; 