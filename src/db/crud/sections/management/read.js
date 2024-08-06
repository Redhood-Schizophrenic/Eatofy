import db from "@/db/connector";

export async function read_sections({
	hotel_id
}) {
	try {

		// Inserting the record
		const result = await db.sections.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

export async function read_section({
	section_name
}) {
	try {

		// Fetching the record
		const result = await db.sections.findMany({
			where: {
				SectionName: section_name,
				NOT:{
					Status: "Inactive"
				}
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
