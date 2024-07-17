import db from "@/db/connector";

interface InvoiceInterface {
	payment_mode: string | null,
	total_amount: number,
	balance_amount: number,
	payment_status: string,
	supplier_id: string,
	hotel_id: string,
	invoice_date: string,
	invoice_no: string
}

export async function create_invoice ({
	invoice_no,
	payment_mode,
	total_amount,
	balance_amount,
	payment_status,
	supplier_id,
	hotel_id,
	invoice_date
}: InvoiceInterface){
	try {

		// Inserting the record
		const result = await db.purchasedInvoice.create({
			data: {
				HotelId: hotel_id,
				SupplierId: supplier_id,
				PaymentMode: payment_mode,
				TotalAmount: total_amount,
				BalanceAmount: balance_amount,
				PaymentStatus: payment_status,
				Date: invoice_date,
				InvoiceNo: invoice_no
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
