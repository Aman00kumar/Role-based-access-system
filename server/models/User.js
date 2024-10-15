
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'supervisor', 'superadmin'],
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.findByRole = async function (role) {
  return this.find({ role });
};

const User = mongoose.model('User', userSchema);

export default User;


