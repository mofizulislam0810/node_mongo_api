import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  data: String,
  contentType: String,
});

const Image = mongoose.model('Image', imageSchema);

export default Image;