import db from "@/db/connector";

// Fetch all Available Stock
interface StockInterface {
	hotel_id: string
}

export async function read_available_stock ({
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
