import db from "@/db/connector";

export async function create_purchase_stock ({
	invoice_id,
	item_id,
	quantity,
	unit,
	per_price,
	total_price
}){
	try {

		// Inserting the record
		const result = await db.purchasedStock.create({
			data: {
				InvoiceId: invoice_id,
				ItemId: item_id,
				Quantity: quantity,
				Unit: unit,
				PerPrice: per_price,
				Price: total_price
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
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
