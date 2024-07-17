import db from "@/db/connector";

// Status Update
interface StatusInterface { 
	item_id: string,
	status: string
}

export async function update_item_status({
	item_id,
	status
}: StatusInterface) {
	try {

		// Updating the record
		const result = await db.items.update({
			where: {
				id: item_id
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

