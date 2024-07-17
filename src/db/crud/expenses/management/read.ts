import db from "@/db/connector";

interface ExpenseInterface {
	hotel_id: string
}

export async function read_expenses({
	hotel_id
}: ExpenseInterface) {
	try {

		// Inserting the record
		const result = await db.expenses.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			}
		});

		// Database is disconnected
		db.$disconnect();

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
