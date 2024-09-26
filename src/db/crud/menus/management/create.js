import db from "@/db/connector";

export async function create_menu ({
	dish_id,
	section_id,
	price
}) {
	try {

		// Inserting the record
		const result = await db.menus.create({
			data: {
				DishId: dish_id,
				SectionId: section_id,
				Price: price			}
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
