import db from "@/db/connector";

interface SectionsInterface {
	hotel_id: string,
	section_name: string
}

export async function create_section({
	hotel_id,
	section_name
}: SectionsInterface) {
	try {

		// Inserting the record
		const result = await db.sections.create({
			data: {
				HotelId: hotel_id,
				SectionName: section_name
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
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
