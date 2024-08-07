import db from '../config/db.js';

const File = {
  create: async ({name, extension, mimeType, size}) => {
    const query = 'INSERT INTO files (name, extension, mimeType, size, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())';
    return db.execute(query, [name, extension, mimeType, size]);
  },
  findById: async (id) => {
    const query = 'SELECT * FROM files WHERE id = ?';
    return (await db.execute(query, [id]))[0][0];
  },
  findAll: async ({limit, offset}) => {
    const query = 'SELECT * FROM files LIMIT ? OFFSET ?';
    return (await db.execute(query, [limit.toString(), offset.toString()]))[0];
  },
  deleteById: async (id) => {
    const query = 'DELETE FROM files WHERE id = ?';
    return db.execute(query, [id]);
  },
  updateById: async (id, { name, extension, mimeType, size }) => {
    const query = `
      UPDATE Files
      SET name = ?, extension = ?, mimeType = ?, size = ?, updatedAt = NOW()
      WHERE id = ?
    `;
    return db.execute(query, [name, extension, mimeType, size, id]);
  },
};

export default File;
