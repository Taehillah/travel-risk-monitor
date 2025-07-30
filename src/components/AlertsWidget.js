import React, { useState, useEffect } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../firebase';

const AlertsWidget = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alertsRef = ref(database, 'alerts');
    
    const fetchData = onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alertsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          timestamp: new Date(data[key].timestamp)
        }));
        setAlerts(alertsArray);
      }
      setLoading(false);
    });

    return () => off(alertsRef, 'value', fetchData);
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active': return 'danger';
      case 'acknowledged': return 'warning';
      case 'resolved': return 'success';
      default: return 'secondary';
    }
  };

  const getRiskVariant = (riskLevel) => {
    switch (riskLevel) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  if (loading) {
    return <div className="text-white">Loading alerts...</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-white mb-0">Recent Alerts</h4>
        <Button variant="outline-light" size="sm">
          View All
        </Button>
      </div>
      
      <Table hover className="text-white">
        <thead>
          <tr>
            <th>Time</th>
            <th>Alert</th>
            <th>Risk</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(alert => (
            <tr key={alert.id}>
              <td>{alert.timestamp.toLocaleString()}</td>
              <td>{alert.title}</td>
              <td>
                <Badge bg={getRiskVariant(alert.riskLevel)}>
                  {alert.riskLevel}
                </Badge>
              </td>
              <td>
                <Badge bg={getStatusVariant(alert.status)}>
                  {alert.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AlertsWidget;