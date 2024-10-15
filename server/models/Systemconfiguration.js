import mongoose from 'mongoose';

const systemConfigSchema = new mongoose.Schema({
  systemName: {
    type: String,
    required: true,
    default: 'Default System Name',
  },
  timeZone: {
    type: String,
    required: true,
    default: 'UTC',
  },
  notificationsEnabled: {
    type: Boolean,
    default: false, // Optional, can be true/false based on default preference
  },
  maintenanceMode: {
    type: Boolean,
    default: false, // Optional, can be true/false based on default preference
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const SystemConfiguration = mongoose.model('SystemConfiguration', systemConfigSchema);

export default SystemConfiguration;
