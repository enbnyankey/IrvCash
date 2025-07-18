//  const generateEmployeeId = async (pool) => {
//     const result = await pool.query("SELECT employee_id FROM employees ORDER BY employee_id DESC LIMIT 1");
//     let nextNumber = 1;
//     if (result.rows.length > 0) {
//         // Extract numeric part and increment
//         const lastId = result.rows[0].id;
//         const num = parseInt(lastId.replace('emp', ''), 10);
//         nextNumber = num + 1;
//     }
//     return `emp${nextNumber.toString().padStart(5, '0')}`;
// };
// export default generateEmployeeId;
3

const generateEmployeeId = async (pool) => {
    // Query employee_code instead of employee_id since we're generating EMP codes
    const result = await pool.query("SELECT employee_code FROM employees WHERE employee_code LIKE 'EMP%' ORDER BY employee_code DESC LIMIT 1");
    let nextNumber = 1;
    if (result.rows.length > 0 && result.rows[0].employee_code) {
        const lastCode = result.rows[0].employee_code;
        const num = parseInt(lastCode.replace('EMP', ''), 10);
        nextNumber = num + 1;
    }
    return `EMP${nextNumber.toString().padStart(3, '0')}`;
};

export default generateEmployeeId;