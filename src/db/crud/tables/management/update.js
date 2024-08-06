import db from "@/db/connector";

export async function update_table_name({
	table_id,
	table_name
}) {
	try {

		// Updating the record
		const result = await db.tables.update({
			where: {
				id: table_id
			},
			data: {
				TableName: table_name
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


export async function update_table_status({
	table_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.tables.update({
			where: {
				id: table_id
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
