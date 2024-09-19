import db from "@/db/connector";

export async function update_dish_details({
	dish_name,
	dish_code,
	description,
	dish_type,
	dish_id
}) {
	try {

		// Updating the record
		const result = await db.dishes.update({
			where: {
				id: dish_id
			},
			data: {
				DishName: dish_name,
				Code: dish_code,
				Description: description,
				Type: dish_type
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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


// Update Dish Image
export async function update_dish_image({
	dish_id,
	buffer
}) {
	try {

		// Updating the record
		const result = await db.dishes.update({
			where: {
				id: dish_id
			},
			data: {
				DishImage: buffer
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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

// Update Dish Status
export async function update_dish_status({
	dish_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.dishes.update({
			where: {
				id: dish_id
			},
			data: {
				Status: status
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
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
