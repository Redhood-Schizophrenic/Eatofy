import db from "@/db/connector";

// Fetch Reservations
export async function read_reservations({
	hotel_id,
}) {
	try {

		const result = await db.tableReservation.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: [
				{
					Date: "desc"
				},
				{
					Time: "asc"
				}
			],
			include: {
				Customer: true
			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Reservations doesn't exist",
				output: result
			};
		}

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
