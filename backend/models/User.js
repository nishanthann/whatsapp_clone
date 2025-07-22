import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  phone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },profileImage: {
    type: String,
    default: 'default_profile.jpg' // optional
  }

});




export default mongoose.model('User', UserSchema);