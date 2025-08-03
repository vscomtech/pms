import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Modal, 
  Form, 
  Badge,
  Row,
  Col,
  Alert,
  ProgressBar
} from 'react-bootstrap';
import { 
  FaSync, 
  FaCog, 
  FaServer, 
  FaKey, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaTimesCircle,
  FaPlay,
  FaStop
} from 'react-icons/fa';

const TallySync = () => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, running, completed, error

  const [settings, setSettings] = useState({
    serverUrl: 'http://localhost:9000',
    companyName: 'Default Company',
    username: 'admin',
    password: '',
    port: '9000',
    enableAutoSync: false,
    syncInterval: '30'
  });

  const [syncHistory, setSyncHistory] = useState([
    {
      id: 1,
      invoiceId: 'INV-2024-001',
      status: 'Success',
      lastSyncTime: '2024-01-15 14:30:25',
      errorLog: null,
      syncType: 'Invoice'
    },
    {
      id: 2,
      invoiceId: 'INV-2024-002',
      status: 'Success',
      lastSyncTime: '2024-01-15 14:25:10',
      errorLog: null,
      syncType: 'Invoice'
    },
    {
      id: 3,
      invoiceId: 'INV-2024-003',
      status: 'Failed',
      lastSyncTime: '2024-01-15 14:20:15',
      errorLog: 'Connection timeout - Tally server not responding',
      syncType: 'Invoice'
    },
    {
      id: 4,
      invoiceId: 'INV-2024-004',
      status: 'Pending',
      lastSyncTime: null,
      errorLog: null,
      syncType: 'Invoice'
    }
  ]);

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setShowSettingsModal(false);
    // In real app, save settings to backend
  };

  const handleSync = () => {
    setIsSyncing(true);
    setSyncStatus('running');
    setSyncProgress(0);

    // Simulate sync process
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          setSyncStatus('completed');
          
          // Add new sync record
          const newSync = {
            id: Date.now(),
            invoiceId: `INV-2024-${String(syncHistory.length + 1).padStart(3, '0')}`,
            status: 'Success',
            lastSyncTime: new Date().toLocaleString(),
            errorLog: null,
            syncType: 'Invoice'
          };
          setSyncHistory([newSync, ...syncHistory]);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Success': 'success',
      'Failed': 'danger',
      'Pending': 'warning',
      'Running': 'info'
    };
    return <Badge bg={colors[status]}>{status}</Badge>;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Success':
        return <FaCheckCircle className="text-success" />;
      case 'Failed':
        return <FaTimesCircle className="text-danger" />;
      case 'Pending':
        return <FaClock className="text-warning" />;
      case 'Running':
        return <FaSync className="text-info" />;
      default:
        return <FaClock className="text-muted" />;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaSync className="me-2" />
          Tally ERP Integration
        </h2>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-primary" 
            onClick={() => setShowSettingsModal(true)}
          >
            <FaCog className="me-2" />
            Settings
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSync}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <>
                <FaSync className="me-2 fa-spin" />
                Syncing...
              </>
            ) : (
              <>
                <FaPlay className="me-2" />
                Start Sync
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Sync Status */}
      {isSyncing && (
        <Alert variant="info" className="mb-4">
          <div className="d-flex align-items-center mb-2">
            <FaSync className="me-2 fa-spin" />
            <strong>Sync in Progress...</strong>
          </div>
          <ProgressBar 
            now={syncProgress} 
            label={`${syncProgress}%`}
            className="mb-2"
          />
          <small className="text-muted">
            Syncing invoices to Tally ERP...
          </small>
        </Alert>
      )}

      {syncStatus === 'completed' && (
        <Alert variant="success" className="mb-4" dismissible>
          <FaCheckCircle className="me-2" />
          <strong>Sync completed successfully!</strong> All invoices have been synchronized with Tally ERP.
        </Alert>
      )}

      <Row>
        {/* Connection Status */}
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Header>
              <h6 className="mb-0">
                <FaServer className="me-2" />
                Connection Status
              </h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="bg-success rounded-circle p-2 me-3">
                  <FaCheckCircle className="text-white" />
                </div>
                <div>
                  <h6 className="mb-1">Connected</h6>
                  <small className="text-muted">{settings.serverUrl}</small>
                </div>
              </div>
              
              <div className="mb-3">
                <small className="text-muted d-block">Company:</small>
                <strong>{settings.companyName}</strong>
              </div>
              
              <div className="mb-3">
                <small className="text-muted d-block">Last Connection:</small>
                <strong>{new Date().toLocaleString()}</strong>
              </div>
              
              <Button variant="outline-primary" size="sm" className="w-100">
                Test Connection
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Sync Statistics */}
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Header>
              <h6 className="mb-0">
                <FaSync className="me-2" />
                Sync Statistics
              </h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3} className="text-center mb-3">
                  <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <h4 className="mb-0">
                      {syncHistory.filter(item => item.status === 'Success').length}
                    </h4>
                  </div>
                  <div className="mt-2">
                    <h6 className="mb-1">Successful</h6>
                    <small className="text-muted">Syncs</small>
                  </div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div className="bg-danger text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <h4 className="mb-0">
                      {syncHistory.filter(item => item.status === 'Failed').length}
                    </h4>
                  </div>
                  <div className="mt-2">
                    <h6 className="mb-1">Failed</h6>
                    <small className="text-muted">Syncs</small>
                  </div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <h4 className="mb-0">
                      {syncHistory.filter(item => item.status === 'Pending').length}
                    </h4>
                  </div>
                  <div className="mt-2">
                    <h6 className="mb-1">Pending</h6>
                    <small className="text-muted">Syncs</small>
                  </div>
                </Col>
                <Col md={3} className="text-center mb-3">
                  <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <h4 className="mb-0">
                      {syncHistory.length}
                    </h4>
                  </div>
                  <div className="mt-2">
                    <h6 className="mb-1">Total</h6>
                    <small className="text-muted">Records</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sync History */}
      <Card>
        <Card.Header>
          <h6 className="mb-0">
            <FaClock className="me-2" />
            Sync History
          </h6>
        </Card.Header>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Sync Type</th>
                <th>Status</th>
                <th>Last Sync Time</th>
                <th>Error Log</th>
              </tr>
            </thead>
            <tbody>
              {syncHistory.map((sync) => (
                <tr key={sync.id}>
                  <td>
                    <strong>{sync.invoiceId}</strong>
                  </td>
                  <td>{sync.syncType}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {getStatusIcon(sync.status)}
                      <span className="ms-2">{getStatusBadge(sync.status)}</span>
                    </div>
                  </td>
                  <td>
                    {sync.lastSyncTime ? (
                      <small>{sync.lastSyncTime}</small>
                    ) : (
                      <small className="text-muted">Not synced yet</small>
                    )}
                  </td>
                  <td>
                    {sync.errorLog ? (
                      <small className="text-danger">{sync.errorLog}</small>
                    ) : (
                      <small className="text-muted">No errors</small>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Settings Modal */}
      <Modal show={showSettingsModal} onHide={() => setShowSettingsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <FaCog className="me-2" />
            Tally Integration Settings
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSettingsSubmit}>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Server URL</Form.Label>
                  <Form.Control
                    type="url"
                    value={settings.serverUrl}
                    onChange={(e) => setSettings({...settings, serverUrl: e.target.value})}
                    placeholder="http://localhost:9000"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Port</Form.Label>
                  <Form.Control
                    type="number"
                    value={settings.port}
                    onChange={(e) => setSettings({...settings, port: e.target.value})}
                    placeholder="9000"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={settings.username}
                    onChange={(e) => setSettings({...settings, username: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={settings.password}
                onChange={(e) => setSettings({...settings, password: e.target.value})}
                placeholder="Enter Tally password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Enable Auto Sync"
                checked={settings.enableAutoSync}
                onChange={(e) => setSettings({...settings, enableAutoSync: e.target.checked})}
              />
            </Form.Group>

            {settings.enableAutoSync && (
              <Form.Group className="mb-3">
                <Form.Label>Sync Interval (minutes)</Form.Label>
                <Form.Select
                  value={settings.syncInterval}
                  onChange={(e) => setSettings({...settings, syncInterval: e.target.value})}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="240">4 hours</option>
                </Form.Select>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSettingsModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Settings
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default TallySync; 