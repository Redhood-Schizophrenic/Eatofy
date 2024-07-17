import db from "@/db/connector";

interface DishInterface {
	dish_name: string,
	dish_code: string,
	description: string | null,
	dish_type: string,
	category_id: string,
	buffer: Buffer | null,
	hotel_id: string,
}

// With Logo
export async function create_dish_with_image({
	dish_name,
	dish_code,
	description,
	dish_type,
	category_id,
	buffer,
	hotel_id
}: DishInterface){
	try {
		// Inserting the Dish with Image
		const result = await db.dishes.create({
			data: {
				DishName: dish_name,
				Code: dish_code,
				Description: description,
				Type: dish_type,
				CategoryId: category_id,
				DishImage: buffer,
				HotelId: hotel_id
			},
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

// Without Image
export async function create_dish_without_image({
	dish_name,
	dish_code,
	description,
	dish_type,
	category_id,
	hotel_id
}: DishInterface) {
	try {

		// Inserting the Dish without Image
		const result = await db.dishes.create({
			data: {
				DishName: dish_name,
				Code: dish_code,
				Description: description,
				Type: dish_type,
				CategoryId: category_id,
				HotelId: hotel_id
			},
		});

		// Disconnect the Database
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error: any) {
		
		// Error thrown
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

