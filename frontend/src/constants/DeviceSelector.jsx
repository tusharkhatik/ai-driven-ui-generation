import { FaDesktop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import '../styles/device-selector.css';

const DEVICE_PRESETS = {
  desktop: { width: '100%', height: '100%', label: '🖥️ Desktop' },
  tablet: { width: '768px', height: '1024px', label: '📱 Tablet' },
  mobile: { width: '375px', height: '667px', label: '📲 Mobile' }
};

const DEVICE_ICONS = {
  desktop: FaDesktop,
  tablet: FaTabletAlt,
  mobile: FaMobileAlt
};

export default function DeviceSelector({ activeDevice, onDeviceChange, disabled }) {
  return (
    <div className="device-buttons">
      {Object.entries(DEVICE_PRESETS).map(([key, preset]) => {
        const Icon = DEVICE_ICONS[key];
        return (
          <button
            key={key}
            className={`device-button ${activeDevice === key ? 'active' : ''}`}
            onClick={() => onDeviceChange(key)}
            title={preset.label}
            disabled={disabled}
          >
            <Icon className="icon" />
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </button>
        );
      })}
    </div>
  );
}