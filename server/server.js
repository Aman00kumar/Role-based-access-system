import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import * as XLSX from 'xlsx';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import FormData from './models/FormData.js';
import HelpAndSupport from './models/Helpandsupport.js';
import SystemConfiguration from './models/Systemconfiguration.js';




const app = express();
const port = 5001;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formdata', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// JWT secret key (use environment variable for security in production)
const JWT_SECRET = process.env.JWT_SECRET || 'jKHJhglUGuil897UyuhJ7UIHJO7HUI87uighj';
const JWT_EXPIRES_IN = '1h'; // Access token expires in 1 hour
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // Refresh token expires in 7 days

// Function to generate tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  return { accessToken, refreshToken };
};

// Function to verify token and extract userId
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
};

// Middleware to check authentication and attach userId to request
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  const user = verifyToken(token);
  if (!user) return res.status(401).json({ message: 'Invalid token' });

  req.userId = user.userId;
  req.user = { userId: user.userId, role: user.role };
  next();
};

// Routes for form data management
app.post('/api/formdata', authenticate, async (req, res) => {
  try {
    const { name, email, collectionDate, amount } = req.body;
    const newFormData = new FormData({
      name,
      email,
      collectionDate,
      amount,
      userId: req.userId
    });
    await newFormData.save();
    res.status(201).json(newFormData);
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data' });
  }
});

app.get('/api/formdata', authenticate, async (req, res) => {
  try {
    console.log('Logged in user:', req.userId);

    const query = req.user.role === 'employee'
      ? { userId: req.userId }
      : {};

    const formData = await FormData.find(query);
    res.json(formData);
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ error: 'Failed to fetch form data' });
  }
});

app.delete('/api/formdata/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await FormData.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Form data not found' });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting form data:', error);
    res.status(500).json({ error: 'Failed to delete form data' });
  }
});

app.post('/api/import', upload.single('file'), authenticate, async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const file = req.file.buffer;
    const workbook = XLSX.read(file, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    await FormData.insertMany(data);
    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Error importing form data:', error);
    res.status(500).json({ error: 'Failed to import form data' });
  }
});

// User authentication route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

    const tokens = generateTokens(user);
    res.json({ ...tokens, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Refresh token route
app.post('/api/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

  try {
    const payload = verifyToken(refreshToken);
    if (!payload) return res.status(403).json({ message: 'Invalid refresh token' });

    const newTokens = generateTokens({ _id: payload.userId, role: payload.role });
    res.json(newTokens);
  } catch (err) {
    console.error('Error refreshing token:', err);
    res.status(403).json({ message: 'Failed to refresh token' });
  }
});

// Get logged-in user details
app.get('/api/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Get total number of employees
app.get('/api/totalEmployees', authenticate, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalEmployees: count });
  } catch (error) {
    console.error('Error fetching total employees:', error);
    res.status(500).json({ error: 'Failed to fetch total employees' });
  }
});

// Get count of pending approvals
app.get('/api/pendingApprovals', authenticate, async (req, res) => {
  try {
    const count = await FormData.countDocuments({ approved: false });
    res.json({ pendingApprovals: count });
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({ error: 'Failed to fetch pending approvals' });
  }
});

// Get recent collections
app.get('/api/recentCollections', authenticate, async (req, res) => {
  try {
    const recentCollections = await FormData.find()
      .sort({ collectionDate: -1 })
      .limit(5);
    res.json(recentCollections);
  } catch (error) {
    console.error('Error fetching recent collections:', error);
    res.status(500).json({ error: 'Failed to fetch recent collections' });
  }
});

// Define the API endpoint for help and support form submission
app.post('/api/submit-help-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newSubmission = new HelpAndSupport({ name, email, message });

    await newSubmission.save();
    res.status(201).json({ message: 'Help & Support form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form', error });
  }
});
       // Add a new user endpoint
app.post('/api/users', async (req, res) => {
  const { email, role } = req.body;

  if (!email || !role) {
      return res.status(400).json({ message: 'Email and role are required' });
  }

  try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Create a new user (with a placeholder for password)
      const newUser = new User({ email, role, password: 'hashed_password_here' }); // You may choose to handle password differently
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
  }
});
    // Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch users from MongoDB
    res.json(users);  // Send the users to the frontend
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();  // No content response if deleted
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
    

// GET endpoint for fetching roles
app.get('/api/roles', async (req, res) => {
  try {
    // In a real application, you might fetch this from a database
    res.json(rolesData); // Sending static role data
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
});
app.get('/api/system-config', async (req, res) => {
  try {
    const systemConfig = await SystemConfiguration.findOne();

    if (!systemConfig) {
      return res.status(404).json({ message: 'System configuration not found' });
    }

    res.json(systemConfig);
  } catch (error) {
    console.error('Server error fetching system configuration:', error.message, error.stack);
    res.status(500).json({ message: 'Failed to fetch system configuration' });
  }
});
app.post('/api/system-config', async (req, res) => {
  console.log('Received data:', req.body); // Add this to see incoming data
  const { systemName, timeZone, notificationsEnabled, maintenanceMode } = req.body;

  try {
    const newConfig = new SystemConfiguration({
      systemName,
      timeZone,
      notificationsEnabled,
      maintenanceMode,
    });
    const savedConfig = await newConfig.save();
    res.status(201).json(savedConfig);
  } catch (error) {
    console.error('Error saving system configuration:', error);
    res.status(500).json({ message: 'Failed to save system configuration' });
  }
});









// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});









