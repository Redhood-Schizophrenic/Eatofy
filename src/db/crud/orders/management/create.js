import db from "@/db/connector";

export async function create_menu_of_order({
	quantity,
	note,
	total_amount,
	menu_id,
	bill_id,
	hotel_id
}) {
	try {


		// Inserting the record
		const result = await db.orders.create({
			data: {
				Quantity: quantity,
				Note: note,
				TotalAmount: total_amount,
				MenuId: menu_id,
				BillId: bill_id,
				hotelsId: hotel_id
			}
		});

		// Database is disconnected
		await db.$disconnect();

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
