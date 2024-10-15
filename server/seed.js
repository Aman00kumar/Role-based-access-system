import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.connect('mongodb://localhost:27017/formdata', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String, // Hashed password
  role: String,
});

const User = mongoose.model('User', userSchema);

const users = [
  { email: 'employee1@example.com', password: 'password123', role: 'employee' },
  { email: 'employee2@example.com', password: 'password123', role: 'employee' },
  { email: 'manager@example.com', password: 'password123', role: 'manager' },
  { email: 'supervisor@example.com', password: 'password123', role: 'superadmin' },
];

(async () => {
  // Clear existing users
  await User.deleteMany({});

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password: hashedPassword });
    console.log(`User ${user.email} created`);
  }
  mongoose.connection.close();
})();




