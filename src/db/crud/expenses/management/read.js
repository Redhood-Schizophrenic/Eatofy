import db from "@/db/connector";

export async function read_expenses_asc({
	hotel_id
}) {
	try {

		// Inserting the record
		const result = await db.expenses.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				Date: 'asc'
			}
		});

		// Database is disconnected
		db.$disconnect();

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

export async function read_expenses({
	hotel_id
}) {
	try {

		// Inserting the record
		const result = await db.expenses.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		// Database is disconnected
		db.$disconnect();

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
