import db from "@/db/connector";

interface UpdateOrderInterface {
	order_id: string,
	totalAmt: number,
	totalQty: string
}

export async function update_order_menus ({
	order_id,
	totalAmt,
	totalQty
}: UpdateOrderInterface) {
	try {

		// Fetching the record
		const result = await db.orders.update({
			where: {
				id: order_id,
			},
			data: {
				TotalAmount: totalAmt,
				Quantity: totalQty
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data deleted",
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

// Update Status
interface UpdateStatusOrderInterface {
	order_id: string,
	status: string
}

export async function update_order_status ({
	order_id,
	status
}: UpdateStatusOrderInterface) {
	try {

		// Fetching the record
		const result = await db.orders.update({
			where: {
				id: order_id,
			},
			data: {
				Status: status
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data updated",
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
