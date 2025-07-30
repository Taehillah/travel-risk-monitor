import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Modal } from 'react-bootstrap';
import { ref, onValue, off, set, remove, push } from 'firebase/database';
import { database } from '../firebase';

const DestinationsWidget = () => {
  const [destinations, setDestinations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const destinationsRef = ref(database, 'destinations');
    
    const fetchData = onValue(destinationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const destinationsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          lastChecked: new Date(data[key].lastChecked)
        }));
        setDestinations(destinationsArray);
      }
      setLoading(false);
    });

    return () => off(destinationsRef, 'value', fetchData);
  }, []);

  const getRiskVariant = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const handleEdit = (dest) => {
    setCurrentDestination(dest);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    remove(ref(database, `destinations/${id}`));
  };

  const handleSave = () => {
    const destRef = currentDestination?.id 
      ? ref(database, `destinations/${currentDestination.id}`)
      : ref(database, 'destinations');
    
    const destData = {
      location: currentDestination.location,
      riskLevel: currentDestination.riskLevel,
      lastChecked: new Date().toISOString()
    };

    if (currentDestination?.id) {
      set(destRef, destData);
    } else {
      const newDestRef = push(destRef);
      set(newDestRef, destData);
    }
    
    setShowModal(false);
  };

  if (loading) {
    return <div className="text-white">Loading destinations...</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white mb-0">Monitored Destinations</h5>
        <Button 
          variant="outline-light" 
          size="sm"
          onClick={() => {
            setCurrentDestination(null);
            setShowModal(true);
          }}
        >
          Add New
        </Button>
      </div>

      <div className="table-responsive">
        <Table hover className="text-white">
          <thead>
            <tr>
              <th>Location</th>
              <th>Risk</th>
              <th>Last Checked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map(dest => (
              <tr key={dest.id}>
                <td>{dest.location}</td>
                <td>
                  <Badge bg={getRiskVariant(dest.riskLevel)}>
                    {dest.riskLevel}
                  </Badge>
                </td>
                <td>{dest.lastChecked.toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(dest)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(dest.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>
            {currentDestination ? 'Edit Destination' : 'Add Destination'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <form>
            <div className="mb-3">
              <label className="text-white">Location</label>
              <input
                type="text"
                className="form-control bg-secondary border-dark text-white"
                value={currentDestination?.location || ''}
                onChange={(e) => setCurrentDestination({
                  ...currentDestination,
                  location: e.target.value
                })}
              />
            </div>
            <div className="mb-3">
              <label className="text-white">Risk Level</label>
              <select
                className="form-select bg-secondary border-dark text-white"
                value={currentDestination?.riskLevel || 'medium'}
                onChange={(e) => setCurrentDestination({
                  ...currentDestination,
                  riskLevel: e.target.value
                })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DestinationsWidget;