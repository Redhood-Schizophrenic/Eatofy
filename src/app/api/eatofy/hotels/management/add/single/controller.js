import { create_hotel_without_logo } from "@/db/crud/hotels/management/create/create";
import { hashing } from "@/utils/hashing";

export async function add_hotel(data) {
	try {

		const hotel_name = data['hotel_name'];
		const email = data['email'];
		const password = data['password'];
		const address = data['address'];
		const speciality = data['speciality'];
		const contacts = data['contacts'];
		const website = data['website'];
		const fssai_code = data['fssai_code'];

		// Default Invalid Checker
		if (
			hotel_name == null || email == null || password == null || address == null || speciality == null || contacts == null || fssai_code == null ||
			hotel_name == undefined || email == undefined || password == undefined || address == undefined || speciality == undefined || contacts == undefined || fssai_code == undefined ||
			hotel_name == "" || email == "" || password == "" || address == "" || speciality == "" || contacts == "" || fssai_code == ""
		) {
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

		if (result.returncode == 200) {

			return {
				returncode: 200,
				message: "Hotel Added",
				output: result.output
			};
		}

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
