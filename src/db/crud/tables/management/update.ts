import db from "@/db/connector";

interface TableNameInterface {
	table_id: string,
	table_name: string
}

export async function update_table_name({
	table_id,
	table_name
}: TableNameInterface) {
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

	} catch (error: any) {
		
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}


interface TableStatusInterface {
	table_id: string,
	status: string
}

export async function update_table_status({
	table_id,
	status
}: TableStatusInterface) {
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

	} catch (error: any) {
		
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
