import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import File from '../models/File.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const uploadFile = async (req, res) => {
  const { originalname, mimetype, size, filename } = req.file;
  const extension = path.extname(filename);
  
  try {
    const newFileId = (await File.create({
      name: filename,
      extension,
      mimeType: mimetype,
      size,
      uploadDate: new Date(),
    }))[0].insertId;
    
    const file = await File.findById(newFileId);

    res.status(201).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

export const listFiles = async (req, res) => {
  const { list_size = 10, page = 1 } = req.query;
  const limit = parseInt(list_size, 10);
  const offset = (parseInt(page, 10) - 1) * limit;
  
  try {
    const files = await File.findAll({ limit, offset });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list files' });
  }
};

export const deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    await File.deleteById(id);
    fs.unlinkSync(path.join(__dirname, '../uploads', file.name));
    
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
};

export const getFile = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch file information' });
  }
};

export const downloadFile = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const filePath = path.join(__dirname, '../uploads', file.name);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
};

export const updateFile = async (req, res) => {
  const { id } = req.params;
  const { mimetype, size, filename } = req.file;
  const extension = path.extname(filename);
  
  try {
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const oldFilePath = path.join(__dirname, '../uploads', file.name);
    fs.unlinkSync(oldFilePath);
    
    file.name = filename;
    file.extension = extension;
    file.mimeType = mimetype;
    file.size = size;
    
    await File.updateById(id, file);
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update file' });
  }
};
