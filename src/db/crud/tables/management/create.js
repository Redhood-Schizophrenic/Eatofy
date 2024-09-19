import db from "@/db/connector";

export async function create_table({
	hotel_id,
	section_id,
	table_name,
	persons_occupiable
}) {
	try {

		// Inserting the record
		const result = await db.tables.create({
			data: {
				HotelId: hotel_id,
				SectionId: section_id,
				TableName: table_name,
				PersonsOccupiable: persons_occupiable
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
