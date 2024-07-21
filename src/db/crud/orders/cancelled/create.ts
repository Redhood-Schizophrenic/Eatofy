import db from "@/db/connector";

interface CancelledOrderInterface {
	order_id: string,
	reason: string
}

export async function create_cancelled_order({
	order_id,
	reason
}: CancelledOrderInterface) {
	
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

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
