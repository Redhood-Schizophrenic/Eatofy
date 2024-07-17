import db from "@/db/connector";

// Fetch all Items
interface StockInterface {
	invoice_id: string
}

export async function read_purchased_stock ({
	invoice_id
}: StockInterface) {
	try {

		// Fetching the record
		const result = await db.purchasedStock.findMany({
			where: {
				InvoiceId: invoice_id,
				NOT: {
					Status: "Inactive"
				},
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
