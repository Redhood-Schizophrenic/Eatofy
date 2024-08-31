import db from "@/db/connector";

export async function create_available_stock_report({
	date,
	item_id,
	quantity,
	hotel_id,
	unit,
}) {
	try {

		let result;

		// Inserting the record
		if (quantity <= 10) {
			result = await db.availableStockReport.create({
				data: {
					ItemId: item_id,
					Quantity: quantity,
					HotelId: hotel_id,
					Unit: unit,
					Status: "Low Stock",
					Date: date
				}
			});

		}
		else {
			result = await db.availableStockReport.create({
				data: {
					ItemId: item_id,
					Quantity: quantity,
					HotelId: hotel_id,
					Unit: unit,
					Date: date
				}
			});

		}

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
