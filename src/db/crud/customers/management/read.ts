import db from "@/db/connector";

// Fetch a single customer
interface CustomerInterface {
	contact: string,
	customer_name: string
}

export async function read_customer({
	contact,
	customer_name
}: CustomerInterface) {
	try {

		const result = await db.customers.findMany({
			where: {
				CustomerName: customer_name,
				Contact: contact,
				NOT: {
					Status: "Inactive"
				},
			},
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch Hotel's Customers
interface CustomersInterface {
	hotel_id: string
}

export async function read_customers ({
	hotel_id
}: CustomersInterface) {
	try {

		const result = await db.customers.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
			},
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

