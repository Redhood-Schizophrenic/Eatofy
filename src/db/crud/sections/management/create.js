import db from "@/db/connector";

export async function create_section({
	hotel_id,
	section_name
}) {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
