import db from "@/db/connector";

// Fetch all Items
export async function read_items ({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.items.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				ItemName: "asc"
			},
			include: {
				Category: true
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

// Check if item exists
export async function check_item ({
	item_name,
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.items.findMany({
			where: {
				ItemName: item_name,
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
				message: "Item doesn't exist",
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


// Fetch single Item
export async function read_item ({
	item_id
}) {
	try {

		// Fetching the record
		const result = await db.items.findMany({
			where: {
				id: item_id,
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
				message: "Item doesn't exist",
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
