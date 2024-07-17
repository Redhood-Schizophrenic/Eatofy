import db from "@/db/connector";

// Status Update
interface StatusInterface { 
	available_stock_id: string,
	status: string
}

export async function update_available_stock_status({
	available_stock_id,
	status
}: StatusInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Quantity Update
interface QuantityInterface { 
	available_stock_id: string,
	quantity: string
}

export async function update_available_stock_quantity({
	available_stock_id,
	quantity
}: QuantityInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
