import jwt from 'jsonwebtoken';




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