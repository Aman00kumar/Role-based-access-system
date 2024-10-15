import mongoose from 'mongoose';

// Define the form data schema with userId
const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  collectionDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Added userId
});

// Create the model
const FormData = mongoose.model('FormData', formDataSchema);

// Use ES module export
export default FormData;
