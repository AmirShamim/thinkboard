import Note from "../models/Note.js";
import mongoose from "mongoose"

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({message: "Internal sever error while finding note"});
    }
}


export async function getNoteById(req, res) {
    try {
        const notes = await Note.findById(req.params.id);
        if (!notes) return res.status(404).json({message: "Note with id not found"})
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({message: "Internal sever error while finding note with id"});
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        if (!title || !content) return res.status(400).json({message: "title and content are required to create note"})
        const note = new Note({title, content});
        const savedNote = await note.save()
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error creating notes:", error);
        res.status(500).json({message: "Internal server error while creating note"});
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if (!updatedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({message: "Internal server error while updating note"})
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json({message: "Note deleted successfully"})
    } catch (error) {
        console.error("Error deleting note", error)
        res.status(500).json({message: "Internal sever error while deleting note"})
    }
}