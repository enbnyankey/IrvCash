import jwt from 'jsonwebtoken';



const refreshToken = process.env.REFRESH_TOKEN_SECRET;
const accessToken = process.env.ACCESS_TOKEN_SECRET;
import dotenv from 'dotenv';
 const createJWT = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        name: user.name
    };
    const secretKey = process.env.JWT_SECRET;
    const options = {
    expiresIn: '1h'
    };
 return jwt.sign(payload, secretKey, options);
};
export default createJWT;



export const generateAccessToken = (user) => {
    return jwt.sign(user, accessToken, { expiresIn: '15m' });
};

export const generateRefreshToken = (user) => {
    return jwt.sign(user, refreshToken, { expiresIn: '7d' });
};





