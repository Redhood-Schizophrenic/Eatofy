import db from "@/db/connector";

export async function create_reservation({
	no_of_persons,
	date,
	time,
	customer_id,
	note,
	hotel_id
}) {
	
	try {

		// Inserting the record
		const result = await db.tableReservation.create({
			data: {
				
				Date: date,
				Time: time,
				CustomerId: customer_id,
				Note: note,
				HotelId: hotel_id,
				NoOfPersons: no_of_persons
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
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
