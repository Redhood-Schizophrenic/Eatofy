import { NextResponse } from "next/server";
import { serializeCookie } from '@/utils/session';


export async function DELETE() {
	try {

		// Set cookie options
		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict' as const,
			path: '/',
			maxAge: -1, // Expired

		};

		// Set token cookie
		const headers = new Headers();
		headers.append('Set-Cookie', serializeCookie('token', '', cookieOptions));

		return NextResponse.json(
			{
				returncode: 200,
				message: "Logged Out Successfully",
				output: []
			},
			{
				headers,
			}
		);
	}
	catch (error: any) {
		return NextResponse.json(
			{
				returncode: 500,
				message: `Error Authenticating user: ${error.message}`,
				output: []
			}
		);
	}
}
