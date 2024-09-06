import db from "@/db/connector";

// Check Available Stock
export async function check_available_stock_report({
	hotel_id,
	date
}) {
	try {

		// Fetching the record
		const result = await db.availableStockReport.findMany({
			where: {
				HotelId: hotel_id,
				Date: date,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				createdAt: "desc"
			},
			include: {
				Items: {
					include: {
						Category: true
					}
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch all Available Stock
export async function read_available_stock_report({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.availableStockReport.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				Date: 'desc'
			},
			include: {
				Items: {
					include: {
						Category: true
					}
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
