import db from "@/db/connector";

interface StockInterface {
	invoice_id: string,
	item_id: string,
	quantity: string,
	unit: string
}

export async function create_purchase_stock ({
	invoice_id,
	item_id,
	quantity,
	unit
}: StockInterface){
	try {

		// Inserting the record
		const result = await db.purchasedStock.create({
			data: {
				InvoiceId: invoice_id,
				ItemId: item_id,
				Quantity: quantity,
				Unit: unit
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
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
