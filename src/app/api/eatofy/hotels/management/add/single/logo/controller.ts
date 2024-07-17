import { create_hotel_with_logo } from "@/db/crud/hotels/management/create/create";
import { ApiResponse } from "@/types/ApiResponse";
import { hashing } from "@/utils/hashing";

export async function add_hotel(data: any): Promise<ApiResponse> {
	try {

		const hotel_name: string | null = data.get('hotel_name');
		const email: string | null = data.get('email');
		const password: string | null = data.get('password');
		const address: string | null = data.get('address');
		const speciality: string | null = data.get('speciality');
		const contacts: string | null = data.get('contacts');
		const website: string | null = data.get('website');
		const fssai_code: string | null = data.get('fssai_code');
		const logo: File | null = data.get('logo');

		// Default Invalid Checker
		if (hotel_name == null || email == null || password == null || address == null || speciality == null || contacts == null || logo == null || fssai_code == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Image Buffer Converter
		const array_buffer = await logo.arrayBuffer();
		const uint8array = new Uint8Array(array_buffer);
		const buffer = Buffer.from(uint8array);
		
		// Password Hashing
		const hashedPassword = await hashing(password);

		// Split speciality and contacts into arrays
		const specialities = speciality.split(',').map((s) => s.trim());
		const contactList = contacts.split(',').map((c) => c.trim());


		// Inserting the Hotel
		const result = await create_hotel_with_logo({
			hotel_name,
			email,
			hashedPassword,
			address,
			specialities,
			contacts: contactList, // Use correct variable name here
			website,
			fssai_code,
			buffer // Ensure 'buffer' matches your structure for handling the logo

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
