import { createToken } from '@/utils/jwt';
import { auth_staff_login } from './controller';
import { NextResponse } from "next/server";
import { serializeCookie } from '@/utils/session';


export async function POST(request: Request) {
	try {
		const data = await request.json();
		const result = await auth_staff_login(data);

		if (result.returncode == 200) {

			// Create JWT token
			const token = createToken({
				// (result.output as { id: string }).id
				hotel_id: `${result.output[0].HotelId}`,
				employee_id: `${result.output[0].id}`,
			});

			// Set cookie options
			const cookieOptions = {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict' as const,
				path: '/',
				maxAge: 60 * 60 * 24, // 1 day
			};

			// Set token cookie
			const headers = new Headers();
			headers.append('Set-Cookie', serializeCookie('token', token, cookieOptions));
			headers.append('JWT-Token',  token);

			return NextResponse.json(
				{
					returncode: result.returncode,
					message: result.message,
					output: [
						{
							result: result.output
						},
						{
							token
						}
					]
				},
				{
					headers,
					status: result.returncode
				},
			);
		} else {
			return NextResponse.json(
				{
					returncode: result.returncode,
					message: result.message,
					output: result.output
				},
				{
					status: result.returncode
				}
			);
		}
	}
	catch (error: any) {
		return NextResponse.json(
			{
				returncode: 500,
				message: `Error Authenticating user: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
