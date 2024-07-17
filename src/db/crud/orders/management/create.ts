import db from "@/db/connector";

interface OrderInterface {
	quantity: string,
	note: string | null,
	total_amount: number,
	menu_id: string,
	bill_id: string,
	hotel_id: string
}

export async function create_menu_of_order({
	quantity,
	note,
	total_amount,
	menu_id,
	bill_id,
	hotel_id
}: OrderInterface) {
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

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
