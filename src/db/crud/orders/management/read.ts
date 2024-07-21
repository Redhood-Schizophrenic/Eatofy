import db from "@/db/connector";

// Check Order Exists
interface OrderCheckInterface {
	menu_id: string,
	bill_id: string
}

export async function order_check({
	menu_id,
	bill_id
}: OrderCheckInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch all categories
interface OrderInterface {
	bill_id: string
}

export async function order_display({
	bill_id
}: OrderInterface) {
	try {

		// Fetching the record
		const result = await db.orders.findMany({
			where: {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch all categories
interface KotInterface {
	hotel_id: string
}

export async function kot_display({
	hotel_id
}: KotInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch single
interface MenuInterface {
	order_id: string
}

export async function read_order({
	order_id
}: MenuInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
