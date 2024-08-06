import { hashing } from '@/utils/hashing';
import db from "@/db/connector";

export async function update_hotel(data) {
	try {

		const hotel_name = data['hotel_name'];
		const email = data['email'];
		const password = data['password'];
		const address = data['address'];
		const speciality = data['speciality'];
		const contacts = data['contacts'];
		const website = data['website'];
		const fssai_code = data.get('fssai_code');

		// Default Invalid Checker
		if ( hotel_name == null || email == null || password == null || address == null || speciality == null || contacts == null || website == null || fssai_code == null ||
		 hotel_name == undefined || email == undefined || password == undefined || address == undefined || speciality == undefined || contacts == undefined || website == undefined || fssai_code == undefined ||
		 hotel_name == "" || email == "" || password == "" || address == "" || speciality == "" || contacts == "" || website == "" || fssai_code == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}

		const HashedPassword = await hashing(password);

		// Check whether hotel exists
		const existingHotel = await db.hotels.findMany({
			where: {
				Email: { equals: email }
			}
		});

		if (existingHotel.length == 0) {
			return {
				returncode: 307,
				message: "Hotel doesn't Exists, please register",
				output: []
			}
		}

		const hotel_updated = await db.hotels.update({
			where: {
				Email: email,
			},
			data: {
				HotelName: hotel_name,
				Email: email,
				HashedPassword: HashedPassword,
				SaltPassword: "10",
				Address: address,
				Speciality: speciality,
				//Speciality: speciality.split(',').map((s: any) => s.trim()),
				Contacts: contacts,
				//Contacts: contacts.split(',').map((s: any) => s.trim()),
				Website: website,
				FSSAICode: fssai_code
			},
		});

		db.$disconnect();

		return {
			returncode: 200,
			message: "Hotel Updated",
			output: hotel_updated
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

