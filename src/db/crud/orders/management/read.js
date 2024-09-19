import db from "@/db/connector";

// Check Order Exists
export async function order_check({
	menu_id,
	bill_id
}) {
	try {

		// Fetching the record
		const result = await db.orders.findMany({
			where: {
				MenuId: menu_id,
				BillId: bill_id,
				NOT: {
					Status: "Inactive"
				}
			},
			include: {
				Menu: {
					include: {
						Dish: true
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

// Fetch all categories
export async function order_display({
	bill_id
}) {
	try {

		// Fetching the record
		const result = await db.orders.findMany({
			where: {
				BillId: bill_id,
				NOT: {
					Status: "Inactive"
				}

			},
			orderBy: {
				createdAt: "desc"
			},
			include: {
				Menu: {
					include: {
						Dish: true
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

// Fetch all categories
export async function kot_display({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.orders.findMany({
			where: {
				hotelsId: hotel_id,
				Bill: {
					Table: {
						Status: "Booked"
					}
				},
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				createdAt: "desc"
			},
			include: {
				Menu: {
					include: {
						Dish: true
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

// Fetch single
export async function read_order({
	order_id
}) {
	try {

		// Fetching the record
		const result = await db.orders.findMany({
			where: {
				id: order_id,
				NOT: {
					Status: "Inactive"
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
