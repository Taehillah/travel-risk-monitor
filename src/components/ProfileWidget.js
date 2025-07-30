import React, { useState } from 'react';
import { Form, Button, Alert, Badge } from 'react-bootstrap';

const ProfileWidget = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    notificationThreshold: 3,
    preferredRegion: 'europe'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSave = () => {
    // In a real app, this would call an API
    setMessage({ text: 'Profile updated successfully!', variant: 'success' });
    setIsEditing(false);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-white mb-0">Your Profile</h5>
        {isEditing ? (
          <Button variant="outline-light" size="sm" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="outline-light" size="sm" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </div>

      {message && (
        <Alert variant={message.variant} className="py-2">
          {message.text}
        </Alert>
      )}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">Name</Form.Label>
          <Form.Control
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
            readOnly={!isEditing}
            className={isEditing ? 'bg-secondary text-white' : 'bg-dark text-white'}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Email</Form.Label>
          <Form.Control
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({...profile, email: e.target.value})}
            readOnly={!isEditing}
            className={isEditing ? 'bg-secondary text-white' : 'bg-dark text-white'}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">Notification Threshold</Form.Label>
          <Form.Select
            value={profile.notificationThreshold}
            onChange={(e) => setProfile({...profile, notificationThreshold: e.target.value})}
            disabled={!isEditing}
            className={isEditing ? 'bg-secondary text-white' : 'bg-dark text-white'}
          >
            {[1, 2, 3, 4, 5].map(level => (
              <option key={level} value={level}>
                Level {level} - {level === 1 ? 'Critical Only' : level === 5 ? 'All Alerts' : ''}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label className="text-white">Preferred Region</Form.Label>
          <Form.Select
            value={profile.preferredRegion}
            onChange={(e) => setProfile({...profile, preferredRegion: e.target.value})}
            disabled={!isEditing}
            className={isEditing ? 'bg-secondary text-white' : 'bg-dark text-white'}
          >
            <option value="global">Global</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="americas">Americas</option>
            <option value="africa">Africa</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </>
  );
};

export default ProfileWidget;