import db from "@/db/connector";

// Check Order Exists
interface CancelledOrderCheckInterface {
	order_id: string
}

export async function cancelled_order_check({
	order_id
}: CancelledOrderCheckInterface) {
	try {

		// Fetching the record
		const result = await db.cancelledOrders.findMany({
			where: {
				OrderId: order_id,
				Order: {
					NOT: {
						Status: "Inactive"
					}
				}
			},

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

// Fetch all Cancelled Orders
interface CancelledOrderInterface {
	hotel_id: string
}

export async function cancelled_orders({
	hotel_id
}: CancelledOrderInterface) {
	try {

		// Fetching the record
		const result = await db.cancelledOrders.findMany({
			where: {
				Order: {
					hotelsId: hotel_id,
					Status: "Inactive"
				},
			},
			include: {
				Order: {
					include: {
						Menu: {
							include: {
								Dish: true
							}
						}
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
