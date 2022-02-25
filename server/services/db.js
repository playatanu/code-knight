import mongoose from 'mongoose';

const dbConnect = () => {
  mongoose.connect(process.env.MONGOURL);
};

export default dbConnect;
