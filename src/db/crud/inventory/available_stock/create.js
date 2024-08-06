import db from "@/db/connector";

export async function create_available_stock ({
	item_id,
	quantity,
	hotel_id,
	unit
}){
	try {

		// Inserting the record
		const result = await db.availableStock.create({
			data: {
				ItemId: item_id,
				Quantity: quantity,
				HotelId: hotel_id,
				Unit: unit
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
