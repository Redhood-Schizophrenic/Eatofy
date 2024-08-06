import db from "@/db/connector";

export async function update_hotel_profile(data) {
	try {

		const email = data.get('email');
		const logo = data.get('logo');

		// Default Invalid Checker
		if (logo == null || email == null ||
			logo == undefined || email == undefined ||
			logo == "" || email == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const array_buffer = await logo.arrayBuffer();
		const uint8array = new Uint8Array(array_buffer);
		const buffer = Buffer.from(uint8array);

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

		// Updating the Hotel
		const hotel_updated = await db.hotels.update({
			where: {
				Email: email,
			},
			data: {
				HotelLogo: buffer
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

