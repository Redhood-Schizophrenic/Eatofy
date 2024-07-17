import db from "@/db/connector";

interface BillInterface {
	type: string,
	table_id: string | null,
	waiter_id: string,
	hotel_id: string,
	customer_id: string | null,
	}

export async function create_bill ({
	type,
	table_id,
	waiter_id,
	hotel_id,
	customer_id,
}: BillInterface) {
	try {

		// Inserting the record
		const result = await db.bills.create({
			data: {
				Type: type,
				TableId: table_id,
				WaiterId: waiter_id,
				HotelId: hotel_id,
				CustomerId: customer_id,
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
