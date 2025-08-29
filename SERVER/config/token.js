import jwt from "jsonwebtoken";

export const secretKey = "1234superman";

export const generateToken = (id) => {
    const token = jwt.sign({id},secretKey,{expiresIn : "7d"});
    return token;
}
