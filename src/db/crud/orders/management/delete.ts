import db from "@/db/connector";

interface DeleteOrderInterface {
	order_id: string
}

export async function delete_order_menus ({
	order_id
}: DeleteOrderInterface) {
	try {

		// Fetching the record
		const result = await db.orders.delete({
			where: {
				id: order_id,
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data deleted",
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
