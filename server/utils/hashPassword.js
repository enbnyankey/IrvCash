//import bcrypt from 'bcrypt';

// export const hashPassword = async(password) =>{
//     const salt = bcrypt.genSaltSync(10);
//         return bcrypt.genSaltSync(hashPassword, salt);
//     };



import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);          // generate salt
  return await bcrypt.hash(password, salt);       // hash the password with the salt
};
