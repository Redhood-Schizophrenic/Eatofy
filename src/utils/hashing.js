import bcrypt from 'bcrypt';

// Function to hash a password
export async function hashing(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
