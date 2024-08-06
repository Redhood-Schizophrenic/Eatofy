import db from "@/db/connector";

export async function create_cancelled_order({
	order_id,
	reason
}) {
	
	try {

		// Inserting the record
		const result = await db.cancelledOrders.create({
			data: {
				OrderId: order_id,
				Reason: reason
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
