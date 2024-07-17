import { create_hotel_without_logo } from "@/db/crud/hotels/management/create/create";
import { ApiResponse } from "@/types/ApiResponse";
import { hashing } from "@/utils/hashing";

export async function add_hotel(data: any): Promise<ApiResponse> {
	try {

		const hotel_name: string | null = data['hotel_name'];
		const email: string | null = data['email'];
		const password: string | null = data['password'];
		const address: string | null = data['address'];
		const speciality: string[] | null = data['speciality'];
		const contacts: string[] | null = data['contacts'];
		const website: string | null = data['website'];
		const fssai_code: string | null = data['fssai_code'];

		// Default Invalid Checker
		if (hotel_name == null || email == null || password == null || address == null || speciality == null || contacts == null || fssai_code == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Password Hashing
		const hashedPassword = await hashing(password);

		// Inserting the Hotel
		const result = await create_hotel_without_logo({
			hotel_name,
			email,
			hashedPassword,
			address,
			specialities: speciality,
			contacts: contacts,
			website,
			fssai_code,
			buffer: null
		});

		return {
			returncode: 200,
			message: "Hotel Added",
			output: Array.isArray(result.output) ? result.output : [result.output as any]
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
