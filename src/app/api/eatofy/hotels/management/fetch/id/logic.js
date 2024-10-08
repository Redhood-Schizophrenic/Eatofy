import db from "@/db/connector";

export async function fetch_hotel(data) {
	try {

		const hotel_id = data['hotel_id'] || null;

		// Default Invalid Checker
		if (hotel_id === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// If Hotel doesn't exists
		const existingHotel = await db.hotels.findMany({
			where: {
				id: { equals: hotel_id }
			}
		});

		if (existingHotel.length == 0) {
			return {
				returncode: 307,
				message: "Hotel doesn't Exists, please add one",
				output: []
			}
		}

		existingHotel.forEach(hotel => {
			hotel.HotelLogo = hotel.HotelLogo?.toString('base64');
		});

		db.$disconnect();

		return {
			returncode: 200,
			message: "Hotel Fetched",
			output: existingHotel
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
