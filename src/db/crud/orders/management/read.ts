import db from "@/db/connector";

// Fetch all categories
interface OrderInterface {
	bill_id: string
}

export async function order_display ({
	bill_id
}: OrderInterface) {
	try {

		// Fetching the record
		const result = await db.orders.findMany({
			where: {
				BillId: bill_id,
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

// Fetch all categories
interface KotInterface {
	hotel_id: string
}

export async function kot_display ({
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

export async function read_order ({
	order_id
}: MenuInterface) {
	try {

		// Fetching the record
		const result = await db.orders.findMany({
			where: {
				id: order_id,
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
