import React from 'react';

const DeviceSelector = () => {
    const devices = ['Device 1', 'Device 2', 'Device 3'];
    const [selectedDevice, setSelectedDevice] = React.useState(devices[0]);

    const handleChange = (event) => {
        setSelectedDevice(event.target.value);
    };

    return (
        <div>
            <label htmlFor="device-selector">Select a Device:</label>
            <select id="device-selector" value={selectedDevice} onChange={handleChange}>
                {devices.map((device) => (
                    <option key={device} value={device}>{device}</option>
                ))}
            </select>
            <p>You have selected: {selectedDevice}</p>
        </div>
    );
};

export default DeviceSelector;
