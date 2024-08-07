import db from '../config/db.js';

const User = {
  create: async ({id, password}) => {
    const query = 'INSERT INTO users (id, password, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())';
    return db.execute(query, [id, password]);
  },
  findById: async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    return (await db.execute(query, [id]))[0][0];
  },
};

export default User;
