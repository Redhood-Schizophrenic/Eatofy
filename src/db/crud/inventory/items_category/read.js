import db from "@/db/connector";

// Fetch all categories
export async function read_item_categories ({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.itemCategories.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				CategoryName: "asc"
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

// Check if category exists
export async function check_item_category_name ({
	category_name,
	hotel_id
}) {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Single Category Fetch
export async function read_category ({
	category_id
}) {
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
