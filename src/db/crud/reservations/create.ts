import db from "@/db/connector";

interface ReservationInterface {
	date: string,
	time: string,
	customer_id: string,
	note: string | null,
	hotel_id: string
}

export async function create_reservation({
	date,
	time,
	customer_id,
	note,
	hotel_id
}: ReservationInterface) {
	
	try {

		// Inserting the record
		const result = await db.tableReservation.create({
			data: {
				Date: date,
				Time: time,
				CustomerId: customer_id,
				Note: note,
				HotelId: hotel_id			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
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
