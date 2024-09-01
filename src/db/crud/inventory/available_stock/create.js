import db from "@/db/connector";

export async function create_available_stock({
	item_id,
	quantity,
	hotel_id,
	unit
}) {
	try {

		let result;

		// Inserting the record
		if (quantity <= 20) {
			result = await db.availableStock.create({
				data: {
					ItemId: item_id,
					Quantity: quantity,
					HotelId: hotel_id,
					Unit: unit,
					Status: "Low Stock"
				}
			});

		}
		else {
			result = await db.availableStock.create({
				data: {
					ItemId: item_id,
					Quantity: quantity,
					HotelId: hotel_id,
					Unit: unit
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
