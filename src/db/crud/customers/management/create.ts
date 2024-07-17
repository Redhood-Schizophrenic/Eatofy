import db from "@/db/connector";

interface CustomersInterface {
	customer_name: string,
	contact: string,
	email: string | null,
	hotel_id: string
}

export async function create_customer({
	customer_name,
	contact,
	email,
	hotel_id
}: CustomersInterface) {
	
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

	} catch (error: any) {
		
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}

}
