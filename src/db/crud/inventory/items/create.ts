import db from "@/db/connector";

interface ItemInterface {
	hotel_id: string,
	item_name: string,
	description: string | null,
	category_id: string
}

export async function create_item ({
	hotel_id,
	category_id,
	item_name,
	description
}: ItemInterface){
	try {

		// Inserting the record
		const result = await db.items.create({
			data: {
				HotelId: hotel_id,
				CategoryId: category_id,
				ItemName: item_name,
				Description: description
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
