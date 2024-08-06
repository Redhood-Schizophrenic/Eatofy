import db from "@/db/connector";

// Fetch all Items
export async function read_purchased_stock ({
	invoice_id
}) {
	try {

		// Fetching the record
		const result = await db.purchasedStock.findMany({
			where: {
				InvoiceId: invoice_id,
				NOT: {
					Status: "Inactive"
				},
			},
			orderBy: {
				Items: {
					ItemName: "asc"
				}
			},
			include: {
				Items: true
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
