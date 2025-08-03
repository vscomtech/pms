import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Badge,
  Dropdown,
  Row,
  Col,
  Accordion
} from 'react-bootstrap';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEllipsisV,
  FaCubes,
  FaUsers,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';

const ModuleList = () => {
  const { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [modules, setModules] = useState([
    {
      id: 1,
      name: 'User Management',
      description: 'User authentication and authorization system',
      assignedTeam: ['John Doe', 'Jane Smith'],
      status: 'In Progress',
      subModules: [
        {
          id: 11,
          name: 'Login System',
          description: 'User login and authentication',
          assignedTeam: ['John Doe'],
          status: 'Completed'
        },
        {
          id: 12,
          name: 'User Registration',
          description: 'New user registration process',
          assignedTeam: ['Jane Smith'],
          status: 'In Progress'
        }
      ]
    },
    {
      id: 2,
      name: 'Payment Integration',
      description: 'Payment gateway integration with multiple providers',
      assignedTeam: ['Mike Johnson', 'Sarah Wilson'],
      status: 'Planning',
      subModules: [
        {
          id: 21,
          name: 'Stripe Integration',
          description: 'Stripe payment gateway setup',
          assignedTeam: ['Mike Johnson'],
          status: 'Planning'
        },
        {
          id: 22,
          name: 'PayPal Integration',
          description: 'PayPal payment gateway setup',
          assignedTeam: ['Sarah Wilson'],
          status: 'Planning'
        }
      ]
    },
    {
      id: 3,
      name: 'Reporting System',
      description: 'Analytics and reporting dashboard',
      assignedTeam: ['David Brown', 'Lisa Davis'],
      status: 'Testing',
      subModules: [
        {
          id: 31,
          name: 'Sales Reports',
          description: 'Sales analytics and reporting',
          assignedTeam: ['David Brown'],
          status: 'Testing'
        },
        {
          id: 32,
          name: 'User Reports',
          description: 'User activity and behavior reports',
          assignedTeam: ['Lisa Davis'],
          status: 'In Progress'
        }
      ]
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    assignedTeam: [],
    status: 'Planning'
  });

  const teamOptions = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 
    'David Brown', 'Lisa Davis', 'Alex Turner', 'Emma White', 'Chris Lee'
  ];

  const handleShowModal = (module = null) => {
    if (module) {
      setEditingModule(module);
      setFormData({
        name: module.name,
        description: module.description,
        assignedTeam: module.assignedTeam,
        status: module.status
      });
    } else {
      setEditingModule(null);
      setFormData({
        name: '',
        description: '',
        assignedTeam: [],
        status: 'Planning'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingModule) {
      // Update existing module
      setModules(modules.map(m => 
        m.id === editingModule.id 
          ? { ...m, ...formData }
          : m
      ));
    } else {
      // Add new module
      const newModule = {
        id: Date.now(),
        ...formData,
        subModules: []
      };
      setModules([...modules, newModule]);
    }
    
    setShowModal(false);
  };

  const handleDelete = (moduleId) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      setModules(modules.filter(m => m.id !== moduleId));
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Planning': 'info',
      'In Progress': 'primary',
      'Testing': 'warning',
      'Completed': 'success',
      'On Hold': 'secondary'
    };
    return <Badge bg={colors[status]}>{status}</Badge>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaCubes className="me-2" />
          Modules - Project #{projectId}
        </h2>
        <Button 
          variant="primary" 
          onClick={() => handleShowModal()}
        >
          <FaPlus className="me-2" />
          Add Module
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Accordion>
            {modules.map((module, index) => (
              <Accordion.Item key={module.id} eventKey={index.toString()}>
                <Accordion.Header>
                  <div className="d-flex align-items-center w-100">
                    <div className="flex-grow-1">
                      <strong>{module.name}</strong>
                      <span className="ms-3">{getStatusBadge(module.status)}</span>
                    </div>
                    <div className="me-3">
                      <small className="text-muted">
                        <FaUsers className="me-1" />
                        {module.assignedTeam.length} members
                      </small>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="mb-3">
                    <p className="text-muted mb-2">{module.description}</p>
                    <div className="d-flex gap-2 mb-3">
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleShowModal(module)}
                      >
                        <FaEdit className="me-1" />
                        Edit Module
                      </Button>
                      <Button 
                        variant="outline-success" 
                        size="sm"
                      >
                        <FaPlus className="me-1" />
                        Add Sub-module
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(module.id)}
                      >
                        <FaTrash className="me-1" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Sub-modules Table */}
                  <Table responsive size="sm">
                    <thead>
                      <tr>
                        <th>Sub-module Name</th>
                        <th>Description</th>
                        <th>Assigned Team</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {module.subModules.map((subModule) => (
                        <tr key={subModule.id}>
                          <td>
                            <strong>{subModule.name}</strong>
                          </td>
                          <td>
                            <small className="text-muted">
                              {subModule.description}
                            </small>
                          </td>
                          <td>
                            <small>{subModule.assignedTeam.join(', ')}</small>
                          </td>
                          <td>{getStatusBadge(subModule.status)}</td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                              >
                                <FaEdit />
                              </Button>
                              <Button 
                                variant="outline-success" 
                                size="sm"
                              >
                                <FaPlus />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* Create/Edit Module Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingModule ? 'Edit Module' : 'Add New Module'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Module Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Testing">Testing</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
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
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assigned Team</Form.Label>
              <Form.Select
                multiple
                value={formData.assignedTeam}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({...formData, assignedTeam: selected});
                }}
              >
                {teamOptions.map((member) => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Hold Ctrl (or Cmd on Mac) to select multiple members
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingModule ? 'Update Module' : 'Add Module'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ModuleList; 