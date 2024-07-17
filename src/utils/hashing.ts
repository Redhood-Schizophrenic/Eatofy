import bcrypt from 'bcrypt';

// Function to hash a password
export async function hashing(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}
