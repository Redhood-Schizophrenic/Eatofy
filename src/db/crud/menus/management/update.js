import db from "@/db/connector";

// Price Update
export async function update_menu_price({
	menu_id,
	price
}) {
	try {

		// Updating the record
		const result = await db.menus.update({
			where: {
				id: menu_id
			},
			data: {
				Price: price
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


// Status Update
export async function update_menu_status({
	menu_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.menus.update({
			where: {
				id: menu_id
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
