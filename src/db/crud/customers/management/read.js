import db from "@/db/connector";

// Fetch a single customer
export async function read_customer_by_id({
	customer_id
}) {
	try {

		const result = await db.customers.findMany({
			where: {
				id: customer_id,
				NOT: {
					Status: "Inactive"
				},
			}
		});


		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Customer doesn't exist",
				output: result
			};
		}

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

export async function read_customer({
	contact,
	customer_name
}) {
	try {

		const result = await db.customers.findMany({
			where: {
				CustomerName: customer_name,
				Contact: contact,
				NOT: {
					Status: "Inactive"
				},
			},
			orderBy: {
				CustomerName: 'asc'
			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Customer doesn't exist",
				output: result
			};
		}

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

// Fetch Hotel's Customers
export async function read_customers({
	hotel_id
}) {
	try {

		const result = await db.customers.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
			},
			include: {
				CustomerOccassion: true
			},
			orderBy: {
				CustomerName: 'asc'
			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Customers doesn't exist",
				output: result
			};
		}

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
