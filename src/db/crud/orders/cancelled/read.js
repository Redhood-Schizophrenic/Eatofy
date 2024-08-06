import db from "@/db/connector";

// Check Order Exists
export async function cancelled_order_check({
	order_id
}) {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch all Cancelled Orders
export async function cancelled_orders({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.cancelledOrders.findMany({
			where: {
				Order: {
					hotelsId: hotel_id,
					Status: "Inactive"
				},
			},
			orderBy: {
				createdAt: "desc"
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
