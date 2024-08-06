import db from "@/db/connector";

// Update Status
export async function update_customer_status({
	customer_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.customers.update({
			where: {
				id: customer_id
			},
			data: {
				Status: status
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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

// Update Details
export async function update_customer_details({
	customer_id,
	email
}) {
	try {

		// Updating the record
		const result = await db.customers.update({
			where: {
				id: customer_id
			},
			data: {
				Email: email
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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
