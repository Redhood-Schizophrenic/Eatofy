import db from "@/db/connector";

// Check Available Stock
interface CheckStockInterface {
	hotel_id: string,
	item_id: string
}

export async function check_available_stock({
	hotel_id,
	item_id
}: CheckStockInterface) {
	try {

		// Fetching the record
		const result = await db.availableStock.findMany({
			where: {
				HotelId: hotel_id,
				ItemId: item_id,
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch all Available Stock
interface StockInterface {
	hotel_id: string
}

export async function read_available_stock({
	hotel_id
}: StockInterface) {
	try {

		// Fetching the record
		const result = await db.availableStock.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				Items: {
					ItemName: "asc"
				}
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
