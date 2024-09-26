import db from "@/db/connector";

// Payment Update
export async function update_payment({
	invoice_id,
	payment_status,
	payment_mode,
	balance_amount
}) {
	try {

		// Updating the record
		const result = await db.purchasedInvoice.update({
			where: {
				id: invoice_id
			},
			data: {
				PaymentStatus: payment_status,
				PaymentMode: payment_mode,
				BalanceAmount: balance_amount
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
