import db from "@/db/connector";

// Fetch Reservations
interface ReservationInterface { 
	hotel_id: string,
} 

export async function read_reservations ({
	hotel_id,
}: ReservationInterface) {
	try {

		const result = await db.tableReservation.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			include: {
				Hotel: true,
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

