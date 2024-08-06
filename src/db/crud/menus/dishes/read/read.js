import db from "@/db/connector";

// Fetch to get all the dishes included in a restaurant
export async function read_dishes ({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.dishes.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
				Category: {
					NOT: {
						Status: "Inactive"
					}
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch to check a particular dish exist in a restaurant

export async function read_dish ({
	hotel_id,
	dish_name,
	dish_code
}) {
	try {

		// Fetching the record
		const result = await db.dishes.findMany({
			where: {
				HotelId: hotel_id,
				DishName: dish_name,
				Code: dish_code,
				NOT:{
					Status: "Inactive"
				},
				Category: {
					NOT: {
						Status: "Inactive"
					}
				}

			}		
		});

		if( result.length == 0 ){
			return {
				returncode: 400,
				message: "Dish doesn't exists",
				output: []
			}
		} 

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
