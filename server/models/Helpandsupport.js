import mongoose from 'mongoose';

const helpAndSupportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
});

const HelpAndSupport = mongoose.model('HelpAndSupport', helpAndSupportSchema);

export default HelpAndSupport;

