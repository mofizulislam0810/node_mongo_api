import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  projectURL: String,
  imageName: String,
  isLive: Boolean,
  isRemove: Boolean,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;