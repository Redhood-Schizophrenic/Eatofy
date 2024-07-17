import db from "@/db/connector";

interface DishInterface {
	dish_name: string,
	dish_code: string,
	description: string | null,
	dish_type: string,
	dish_id: string
}

export async function update_dish_details({
	dish_name,
	dish_code,
	description,
	dish_type,
	dish_id
}: DishInterface) {
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

	} catch (error: any) {
		
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}


// Update Dish Image
interface ImageInterface {
	dish_id: string,
	buffer: Buffer
}
export async function update_dish_image({
	dish_id,
	buffer
}: ImageInterface) {
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

	} catch (error: any) {
		
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Update Dish Status
interface StatusInterface {
	dish_id: string,
	status: string
}
export async function update_dish_status({
	dish_id,
	status
}: StatusInterface) {
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

	} catch (error: any) {
		
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
