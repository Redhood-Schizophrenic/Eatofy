import db from "@/db/connector";

// Details Update
interface DetailsInterface {
	category_id: string,
	category_name: string,
	description: string | null
}

export async function update_item_category_details({
	category_id,
	category_name,
	description
}: DetailsInterface) {
	try {

		// Updating the record
		const result = await db.itemCategories.update({
			where: {
				id: category_id
			},
			data: {
				CategoryName: category_name,
				Description: description
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


// Status Update
interface StatusInterface { 
	category_id: string,
	status: string
}

export async function update_item_category_status({
	category_id,
	status
}: StatusInterface) {
	try {

		// Updating the record
		const result = await db.itemCategories.update({
			where: {
				id: category_id
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
