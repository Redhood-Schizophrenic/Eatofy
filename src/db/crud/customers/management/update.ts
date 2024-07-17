import db from "@/db/connector";

// Update Status
interface StatusInterface {
	customer_id: string,
	status: string
}

export async function update_customer_status({
	customer_id,
	status
}: StatusInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Update Details
interface DetailsInterface {
	customer_id: string
	email: string,
}

export async function update_customer_details({
	customer_id,
	email
}: DetailsInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
