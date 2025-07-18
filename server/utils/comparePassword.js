import bcrypt from 'bcrypt';

export const comparePassword = async (plain_pwd, hashed_pwd)=>{
    return await bcrypt.compare(plain_pwd, hashed_pwd);
}