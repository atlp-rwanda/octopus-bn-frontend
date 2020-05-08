import jwt from 'jsonwebtoken';

/**
   * @description decoding token method
   * @param {string} token
   * @returns {object} payload
   */
  export const decode = (token) => {
    const payload = jwt.decode(token, process.env.JWT_SECRET);
    return payload;
  };

  /**
   * @description encoding token method
   * @param {object} claims
   * @returns {string} token
   */
export const encode = (claims) => {
	const token = jwt.sign(claims,'process.env.JWT_SECRET');
	return token;
};
