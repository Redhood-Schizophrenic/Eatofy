import db from "@/db/connector";

export async function create_customer_occassion({
	occassion,
	date,
	customer_id
}) {
	
	try {

		// Inserting the record
		const result = await db.customerOccassion.create({
			data: {
				Occassion: occassion,
				Date: date,
				CustomerId: customer_id
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
