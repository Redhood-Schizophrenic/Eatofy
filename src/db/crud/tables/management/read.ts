import db from "@/db/connector";

interface TablesInterface {
	hotel_id: string
}

export async function read_tables({
	hotel_id
}: TablesInterface) {
	try {

		const result = await db.tables.findMany({
			where: {
				HotelId: hotel_id,
				NOT:{
					Status: "Inactive"
				}
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

interface TableInterface {
	table_name: string,
	section_id: string
}

export async function read_table({
	table_name,
	section_id
}: TableInterface) {
	try {

		const result = await db.tables.findMany({
			where: {
				TableName: table_name,
				SectionId: section_id,
				Status: "Active"
			},
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Table doesn't exist",
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
