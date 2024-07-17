import db from "@/db/connector";

// Fetch all menu categories
interface CategoriesInterface {
	hotel_id: string
}

export async function read_menu_categories ({
	hotel_id
}: CategoriesInterface) {
	try {

		// Fetching the record
		const result = await db.menuCategory.findMany({
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

// Check if category exists
interface CategoryInterface {
	category_name: string,
	hotel_id: string
}

export async function read_category ({
	category_name,
	hotel_id
}: CategoryInterface) {
	try {

		// Fetching the record
		const result = await db.menuCategory.findMany({
			where: {
				CategoryName: category_name,
				HotelId: hotel_id,
				NOT:{
					Status: "Inactive"
				}
			}		
		});

		// Database is disconnected
		db.$disconnect();

		if(result.length==0){
			return {
				returncode: 400,
				message: "Category doesn't exist",
				output: []
			}
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

