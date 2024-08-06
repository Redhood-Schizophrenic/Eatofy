import db from "@/db/connector";

export async function create_customer({
	customer_name,
	contact,
	email,
	hotel_id
}) {
	
	try {

		// Inserting the record
		const result = await db.customers.create({
			data: {
				CustomerName: customer_name,
				Contact: contact,
				Email: email,
				HotelId: hotel_id
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
