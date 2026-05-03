// models/User.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ username, email, password }) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const connection = await pool.getConnection();

      const [result] = await connection.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );

      connection.release();

      return {
        id: result.insertId,
        username,
        email
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const field = error.message.includes('email') ? 'email' : 'username';
        throw new Error(`${field} already exists`);
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const connection = await pool.getConnection();

    const [rows] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    connection.release();

    return rows[0] || null;
  }

  static async findById(id) {
    const connection = await pool.getConnection();

    const [rows] = await connection.query(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [id]
    );

    connection.release();

    return rows[0] || null;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateProfile(userId, { username, email }) {
    const connection = await pool.getConnection();

    await connection.query(
      'UPDATE users SET username = ?, email = ? WHERE id = ?',
      [username, email, userId]
    );

    connection.release();

    return this.findById(userId);
  }

  static async changePassword(userId, oldPassword, newPassword) {
    const user = await this.findById(userId);
    
    const isValid = await this.verifyPassword(oldPassword, user.password_hash);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const connection = await pool.getConnection();

    await connection.query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    connection.release();

    return { message: 'Password changed successfully' };
  }

  static async getUserStats(userId) {
    const connection = await pool.getConnection();

    const [stats] = await connection.query(
      'SELECT COUNT(*) as total_prompts FROM prompts WHERE user_id = ?',
      [userId]
    );

    connection.release();

    return stats[0] || { total_prompts: 0 };
  }
}

module.exports = User;