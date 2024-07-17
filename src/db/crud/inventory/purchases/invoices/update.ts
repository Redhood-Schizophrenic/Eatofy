import db from "@/db/connector";

// Payment Update
interface PaymentInterface { 
	invoice_id: string,
	payment_status: string,
	payment_mode: string,
	balance_amount: number
}

export async function update_payment({
	invoice_id,
	payment_status,
	payment_mode,
	balance_amount
}: PaymentInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
