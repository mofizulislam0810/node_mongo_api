
import mongoose from "mongoose";
import Project from "../models/project.js";
const ObjectId = mongoose.Types.ObjectId;

export const getAllProject = async (req, res) => {
    try {
        const projects = Project.collection.find();
        const result = await projects.toArray();
        res.send(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        res.status(200).json(project);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const postProject = async (req, res) => {
    try {
        const project = req.body;
        const result = await Project.collection.insertOne(project);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Project.deleteOne({ _id: new ObjectId(id) });
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const putProject = async (req, res) => {
    try {
        const id = req.params.id;
        const updateProject = req.body;
        const filter = { _id: new ObjectId(id) };
        const result = await Project.updateOne(
          filter,
          updateProject
        );
        res.send(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};