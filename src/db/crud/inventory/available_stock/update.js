import db from "@/db/connector";

// Status Update
export async function update_available_stock_status({
	available_stock_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.availableStock.update({
			where: {
				id: available_stock_id
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

// Quantity Update
export async function update_available_stock_quantity({
	available_stock_id,
	quantity
}) {
	try {

		// Updating the record
		const result = await db.availableStock.update({
			where: {
				id: available_stock_id
			},
			data: {
				Quantity: quantity
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
