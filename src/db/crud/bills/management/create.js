import db from "@/db/connector";

export async function create_bill ({
	type,
	table_id,
	waiter_id,
	hotel_id,
	customer_id,
}) {
	try {

		// Inserting the record
		const result = await db.bills.create({
			data: {
				Type: type,
				TableId: table_id,
				WaiterId: waiter_id,
				HotelId: hotel_id,
				CustomerId: customer_id,
				Status: "Booked"
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
