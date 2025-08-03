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
  FaFileInvoiceDollar,
  FaDownload,
  FaCalendarAlt,
  FaDollarSign,
  FaUser
} from 'react-icons/fa';

const InvoiceList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNo: 'INV-2024-001',
      clientName: 'ABC Corporation',
      project: 'E-commerce Platform',
      module: 'User Management',
      amount: 15000,
      dueDate: '2024-02-15',
      status: 'Pending',
      description: 'Development of user authentication and management system'
    },
    {
      id: 2,
      invoiceNo: 'INV-2024-002',
      clientName: 'XYZ Solutions',
      project: 'Mobile App Development',
      module: 'Payment Integration',
      amount: 25000,
      dueDate: '2024-02-28',
      status: 'Paid',
      description: 'Mobile app development with payment gateway integration'
    },
    {
      id: 3,
      invoiceNo: 'INV-2024-003',
      clientName: 'TechStart Inc',
      project: 'CRM System',
      module: 'Reporting System',
      amount: 18000,
      dueDate: '2024-03-10',
      status: 'Overdue',
      description: 'CRM system with advanced reporting and analytics'
    }
  ]);

  const [formData, setFormData] = useState({
    clientName: '',
    project: '',
    module: '',
    amount: '',
    dueDate: '',
    description: ''
  });

  const clients = [
    'ABC Corporation', 'XYZ Solutions', 'TechStart Inc', 'Global Systems',
    'Innovation Labs', 'Digital Solutions', 'Future Tech', 'Smart Solutions'
  ];

  const projects = [
    'E-commerce Platform', 'Mobile App Development', 'CRM System', 
    'Reporting System', 'Payment Integration', 'Website Development'
  ];

  const modules = [
    'User Management', 'Payment Integration', 'Reporting System', 
    'Database Design', 'API Development', 'UI/UX Design', 'Testing'
  ];

  const handleShowModal = (invoice = null) => {
    if (invoice) {
      setEditingInvoice(invoice);
      setFormData({
        clientName: invoice.clientName,
        project: invoice.project,
        module: invoice.module,
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        description: invoice.description
      });
    } else {
      setEditingInvoice(null);
      setFormData({
        clientName: '',
        project: '',
        module: '',
        amount: '',
        dueDate: '',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingInvoice) {
      // Update existing invoice
      setInvoices(invoices.map(inv => 
        inv.id === editingInvoice.id 
          ? { ...inv, ...formData, amount: parseFloat(formData.amount) }
          : inv
      ));
    } else {
      // Add new invoice
      const newInvoice = {
        id: Date.now(),
        invoiceNo: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
        ...formData,
        amount: parseFloat(formData.amount),
        status: 'Pending'
      };
      setInvoices([...invoices, newInvoice]);
    }
    
    setShowModal(false);
  };

  const handleDelete = (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(inv => inv.id !== invoiceId));
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Pending': 'warning',
      'Paid': 'success',
      'Overdue': 'danger',
      'Draft': 'secondary'
    };
    return <Badge bg={colors[status]}>{status}</Badge>;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const InvoicePreview = ({ invoice }) => (
    <div className="p-4">
      <div className="text-center mb-4">
        <h3 className="mb-1">INVOICE</h3>
        <p className="text-muted mb-0">{invoice.invoiceNo}</p>
      </div>
      
      <Row className="mb-4">
        <Col md={6}>
          <h6>Bill To:</h6>
          <p className="mb-1"><strong>{invoice.clientName}</strong></p>
          <p className="text-muted mb-0">Client Address</p>
          <p className="text-muted mb-0">City, State, ZIP</p>
        </Col>
        <Col md={6} className="text-md-end">
          <h6>Invoice Details:</h6>
          <p className="mb-1"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          <p className="mb-1"><strong>Due Date:</strong> {invoice.dueDate}</p>
          <p className="mb-0"><strong>Status:</strong> {getStatusBadge(invoice.status)}</p>
        </Col>
      </Row>

      <Table bordered className="mb-4">
        <thead>
          <tr>
            <th>Description</th>
            <th>Project</th>
            <th>Module</th>
            <th className="text-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoice.description}</td>
            <td>{invoice.project}</td>
            <td>{invoice.module}</td>
            <td className="text-end">{formatCurrency(invoice.amount)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} className="text-end">Total:</th>
            <th className="text-end">{formatCurrency(invoice.amount)}</th>
          </tr>
        </tfoot>
      </Table>

      <div className="text-center">
        <p className="text-muted mb-0">Thank you for your business!</p>
      </div>
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaFileInvoiceDollar className="me-2" />
          Invoices
        </h2>
        <Button 
          variant="primary" 
          onClick={() => handleShowModal()}
        >
          <FaPlus className="me-2" />
          Create Invoice
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Client Name</th>
                <th>Project</th>
                <th>Module</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <strong>{invoice.invoiceNo}</strong>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <FaUser className="me-2 text-muted" />
                      {invoice.clientName}
                    </div>
                  </td>
                  <td>{invoice.project}</td>
                  <td>{invoice.module}</td>
                  <td>
                    <strong className="text-success">
                      {formatCurrency(invoice.amount)}
                    </strong>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <FaCalendarAlt className="me-1 text-muted" />
                      {invoice.dueDate}
                    </div>
                  </td>
                  <td>{getStatusBadge(invoice.status)}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="light" size="sm">
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {
                          setEditingInvoice(invoice);
                          setShowPreviewModal(true);
                        }}>
                          <FaEye className="me-2" />
                          Preview
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowModal(invoice)}>
                          <FaEdit className="me-2" />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <FaDownload className="me-2" />
                          Export PDF
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <FaDownload className="me-2" />
                          Export Excel
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => handleDelete(invoice.id)}
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

      {/* Create/Edit Invoice Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Client Name</Form.Label>
                  <Form.Select
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    required
                  >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Project</Form.Label>
                  <Form.Select
                    value={formData.project}
                    onChange={(e) => setFormData({...formData, project: e.target.value})}
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Module</Form.Label>
                  <Form.Select
                    value={formData.module}
                    onChange={(e) => setFormData({...formData, module: e.target.value})}
                    required
                  >
                    <option value="">Select Module</option>
                    {modules.map((module) => (
                      <option key={module} value={module}>{module}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaDollarSign />
                    </span>
                    <Form.Control
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      required
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    required
                  />
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingInvoice ? 'Update Invoice' : 'Create Invoice'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Invoice Preview Modal */}
      <Modal 
        show={showPreviewModal} 
        onHide={() => setShowPreviewModal(false)} 
        size="lg"
        fullscreen="lg-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingInvoice && <InvoicePreview invoice={editingInvoice} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary">
            <FaDownload className="me-2" />
            Download PDF
          </Button>
          <Button variant="outline-success">
            <FaDownload className="me-2" />
            Download Excel
          </Button>
          <Button variant="secondary" onClick={() => setShowPreviewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InvoiceList; 