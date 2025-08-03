import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Badge,
  Dropdown,
  Row,
  Col
} from 'react-bootstrap';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEllipsisV,
  FaProjectDiagram,
  FaUsers,
  FaCalendarAlt
} from 'react-icons/fa';

const ProjectList = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'A comprehensive e-commerce solution with payment integration',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'In Progress',
      teamMembers: ['John Doe', 'Jane Smith', 'Mike Johnson']
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application for iOS and Android',
      startDate: '2024-02-01',
      endDate: '2024-08-31',
      status: 'Planning',
      teamMembers: ['Sarah Wilson', 'David Brown', 'Lisa Davis']
    },
    {
      id: 3,
      name: 'CRM System',
      description: 'Customer relationship management system with analytics',
      startDate: '2023-11-01',
      endDate: '2024-03-31',
      status: 'Testing',
      teamMembers: ['Alex Turner', 'Emma White', 'Chris Lee']
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    teamMembers: []
  });

  const teamOptions = [
    'John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 
    'David Brown', 'Lisa Davis', 'Alex Turner', 'Emma White', 'Chris Lee'
  ];

  const handleShowModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        teamMembers: project.teamMembers
      });
    } else {
      setEditingProject(null);
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        teamMembers: []
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      // Add new project
      const newProject = {
        id: Date.now(),
        ...formData,
        status: 'Planning'
      };
      setProjects([...projects, newProject]);
    }
    
    setShowModal(false);
  };

  const handleDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
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
          <FaProjectDiagram className="me-2" />
          Projects
        </h2>
        <Button 
          variant="primary" 
          onClick={() => handleShowModal()}
        >
          <FaPlus className="me-2" />
          Create New Project
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Team Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <strong>{project.name}</strong>
                  </td>
                  <td>
                    <small className="text-muted">
                      {project.description.length > 50 
                        ? `${project.description.substring(0, 50)}...` 
                        : project.description
                      }
                    </small>
                  </td>
                  <td>
                    <FaCalendarAlt className="me-1 text-muted" />
                    {project.startDate}
                  </td>
                  <td>
                    <FaCalendarAlt className="me-1 text-muted" />
                    {project.endDate}
                  </td>
                  <td>{getStatusBadge(project.status)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <FaUsers className="me-1 text-muted" />
                      <small>{project.teamMembers.length} members</small>
                    </div>
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleShowModal(project)}>
                          <FaEdit className="me-2" />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <FaEye className="me-2" />
                          View
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => handleDelete(project.id)}
                          className="text-danger"
                        >
                          <FaTrash className="me-2" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Create/Edit Project Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status || 'Planning'}
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

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Team Members</Form.Label>
              <Form.Select
                multiple
                value={formData.teamMembers}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({...formData, teamMembers: selected});
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
              {editingProject ? 'Update Project' : 'Create Project'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectList; 