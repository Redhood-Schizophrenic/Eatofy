import db from "@/db/connector";

// Price Update
interface MenuInterface {
	price: number,
	menu_id: string,
}

export async function update_menu_price({
	menu_id,
	price
}: MenuInterface) {
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
	menu_id: string,
	status: string
}

export async function update_menu_status({
	menu_id,
	status
}: StatusInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

