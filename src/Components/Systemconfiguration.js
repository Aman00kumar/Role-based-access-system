import React, { useState, useEffect } from 'react';
import './SystemConfiguration.css'; // Optional: Add styling

const SystemConfiguration = () => {
  const [config, setConfig] = useState({
    systemName: '',
    timeZone: '',
    notificationsEnabled: false,
    maintenanceMode: false,
  });
  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);       // Error state

  useEffect(() => {
    setLoading(true); // Set loading to true while fetching
    fetch('http://localhost:5001/api/system-config')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch configuration');
        }
        return response.json();
      })
      .then(data => {
        setConfig(data);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch(error => {
        console.error('Error fetching system configuration:', error);
        setError('Failed to fetch configuration');
        setLoading(false); // Stop loading on error

        // Call to initialize configuration if it does not exist
        handleInitialize();
      });
  }, []);

  const handleInitialize = () => {
    const initialConfig = {
      systemName: 'Default System Name',
      timeZone: 'UTC',
      notificationsEnabled: false,
      maintenanceMode: false,
    };

    fetch('http://localhost:5001/api/system-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(initialConfig),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save initial configuration');
        }
        return response.json();
      })
      .then(data => {
        console.log('Initial configuration saved:', data);
        alert('Initial configuration created!');
        setConfig(data); // Update state with the newly created config
      })
      .catch(error => {
        console.error('Error saving initial configuration:', error);
        alert('Failed to save initial configuration');
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig({
      ...config,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = () => {
    setLoading(true); // Set loading to true while saving
    fetch('http://localhost:5001/api/system-config', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to save configuration');
        }
        return response.json();
      })
      .then(data => {
        console.log('System configuration updated successfully:', data);
        alert('System configuration saved!');
        setLoading(false); // Stop loading after saving
      })
      .catch(error => {
        console.error('Error saving system configuration:', error);
        setError('Failed to save configuration');
        setLoading(false); // Stop loading on error
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  return (
    <div className="system-config">
      <h1>System Configuration</h1>

      <div className="config-section">
        <label>System Name:</label>
        <input
          type="text"
          name="systemName"
          value={config.systemName}
          onChange={handleInputChange}
          placeholder="Enter system name"
        />
      </div>

      <div className="config-section">
        <label>Time Zone:</label>
        <select
          name="timeZone"
          value={config.timeZone}
          onChange={handleInputChange}
        >
          <option value="">Select time zone</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
          {/* Add other time zones as needed */}
        </select>
      </div>

      <div className="config-section">
        <label>
          <input
            type="checkbox"
            name="notificationsEnabled"
            checked={config.notificationsEnabled}
            onChange={handleInputChange}
          />
          Enable Notifications
        </label>
      </div>

      <div className="config-section">
        <label>
          <input
            type="checkbox"
            name="maintenanceMode"
            checked={config.maintenanceMode}
            onChange={handleInputChange}
          />
          Enable Maintenance Mode
        </label>
      </div>

      <button className="save-button" onClick={handleSave}>Save Configuration</button>
    </div>
  );
};

export default SystemConfiguration;

