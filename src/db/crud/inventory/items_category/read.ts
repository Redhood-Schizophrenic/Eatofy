import db from "@/db/connector";

// Fetch all categories
interface CategoriesInterface {
	hotel_id: string
}

export async function read_item_categories ({
	hotel_id
}: CategoriesInterface) {
	try {

		// Fetching the record
		const result = await db.itemCategories.findMany({
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
interface CategoryNameInterface {
	category_name: string,
	hotel_id: string
}

export async function check_item_category_name ({
	category_name,
	hotel_id
}: CategoryNameInterface) {
	try {

		// Fetching the record
		const result = await db.itemCategories.findMany({
			where: {
				CategoryName: category_name,
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
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

// Single Category Fetch
interface CategoryInterface {
	category_id: string
}

export async function read_category ({
	category_id
}: CategoryInterface) {
	try {

		// Fetching the record
		const result = await db.itemCategories.findMany({
			where: {
				id: category_id,
				NOT: {
					Status: "Inactive"
				},
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
