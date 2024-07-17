import db from "@/db/connector";

// Details Update
interface DetailsInterface {
	category_name: string,
	description: string | null,
	category_id: string,
}

export async function update_menu_category_details({
	category_name,
	description,
	category_id
}: DetailsInterface) {
	try {

		// Updating the record
		const result = await db.menuCategory.update({
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

export async function update_menu_category_status({
	category_id,
	status
}: StatusInterface) {
	try {

		// Updating the record
		const result = await db.menuCategory.update({
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

