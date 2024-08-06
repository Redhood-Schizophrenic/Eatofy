import db from "@/db/connector";

export async function read_tables({
	hotel_id
}) {
	try {

		const result = await db.tables.findMany({
			where: {
				HotelId: hotel_id,
				NOT:{
					Status: "Inactive"
				}
			},
			orderBy: {
				TableName: 'asc'
			}
		});

		// Database is disconnected
		db.$disconnect();

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

export async function read_table({
	table_name,
	section_id
}) {
	try {

		const result = await db.tables.findMany({
			where: {
				TableName: table_name,
				SectionId: section_id,
				Status: "Active"
			},
			orderBy: {

			}
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

export async function read_table_info({
	table_id
}) {
	try {

		const result = await db.tables.findMany({
			where: {
				id: table_id,
				NOT:{
					Status: "Inactive"
				}
			},
			orderBy: {
				TableName: 'asc'
			}
		});

		// Database is disconnected
		db.$disconnect();

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
