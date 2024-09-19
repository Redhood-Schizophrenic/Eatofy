import db from "@/db/connector";

// Fetch Special Occassion's of a Customer
export async function read_occassion({ customer_id }) {
	try {

		const result = await db.customerOccassion.findMany({
			where: {
				CustomerId: customer_id,
				Customer: {
					NOT: {
						Status: "Inactive"
					},
				}
			},
			include: {
				Customer: true
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

// Fetch Special Occasions
export async function read_occassions() {
	try {

		const result = await db.customerOccassion.findMany({
			where: {
				Customer: {
					NOT: {
						Status: "Inactive"
					},
				}
			},
			include: {
				Customer: true
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
