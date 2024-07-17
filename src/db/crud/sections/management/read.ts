import db from "@/db/connector";

interface SectionsInterface {
	hotel_id: string
}

export async function read_sections({
	hotel_id
}: SectionsInterface) {
	try {

		// Inserting the record
		const result = await db.sections.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

interface SectionInterface {
	section_name: string
}

export async function read_section({
	section_name
}: SectionInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

