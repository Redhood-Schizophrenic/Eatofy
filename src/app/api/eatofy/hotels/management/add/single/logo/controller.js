import { create_hotel_with_logo } from "@/db/crud/hotels/management/create/create";
import { hashing } from "@/utils/hashing";

export async function add_hotel(data) {
	try {

		const hotel_name = data.get('hotel_name');
		const email = data.get('email');
		const password = data.get('password');
		const address = data.get('address');
		const speciality = data.get('speciality');
		const contacts = data.get('contacts');
		const website = data.get('website');
		const fssai_code = data.get('fssai_code');
		const logo = data.get('logo');

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
			output: result.output
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
