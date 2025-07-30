import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import AlertsWidget from '../components/AlertsWidget';
import DestinationsWidget from '../components/DestinationsWidget';
import ProfileWidget from '../components/ProfileWidget';

export default function Dashboard() {
  return (
    <>
      <Navigation />
      <Container fluid className="py-4">
        <Row className="g-4">
          {/* Alerts Section */}
          <Col lg={8}>
            <Card className="glass-card" style={{
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
            }}>
              <Card.Body>
                <AlertsWidget />
              </Card.Body>
            </Card>
          </Col>

          {/* Sidebar with Profile and Quick Actions */}
          <Col lg={4}>
            <Card className="glass-card mb-4" style={{
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Card.Body>
                <ProfileWidget />
              </Card.Body>
            </Card>

            <Card className="glass-card" style={{
              borderRadius: '15px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <Card.Body>
                <DestinationsWidget />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}