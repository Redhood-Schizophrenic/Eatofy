import db from "@/db/connector";

interface CategoriesInterface {
	category_name: string,
	hotel_id: string,
	description: string | null,
}

export async function create_item_category ({
	category_name,
	hotel_id,
	description
}: CategoriesInterface){
	try {

		// Inserting the record
		const result = await db.itemCategories.create({
			data: {
				CategoryName: category_name,
				Description: description,
				HotelId: hotel_id
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
