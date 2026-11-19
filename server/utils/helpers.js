const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'carevanta_super_secret_jwt_key_2026', {
    expiresIn: process.env.JWT_EXPIRE || '1d'
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'carevanta_refresh_secret', {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
  });
};

const generateUniqueId = (prefix = 'CV') => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 10));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const paginateResponse = (data, total, page, limit) => ({
  data,
  pagination: {
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1
  }
});

module.exports = {
  generateToken,
  generateRefreshToken,
  generateUniqueId,
  getPagination,
  paginateResponse
};
