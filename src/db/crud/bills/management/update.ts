import db from "@/db/connector";

// Bill Payment
interface BillPaymentInterface {
	bill_id: string,
	total_amount: number,
	cgst_rate: string,
	sgst_rate: string,
	cgst_amount: number,
	sgst_amount: number,
	menu_total: number,
	balance_amount: number,
	discount_rate: string,
	discount_amount: number,
	payment_mode: string,
	payment_status: string
}

export async function bill_payment({
	bill_id,
	total_amount,
	cgst_rate,
	sgst_rate,
	cgst_amount,
	sgst_amount,
	menu_total,
	balance_amount,
	discount_rate,
	discount_amount,
	payment_mode,
	payment_status
}: BillPaymentInterface) {
	try {

		// Updating the Payment
		const result = await db.bills.update({
			where: {
				id: bill_id
			},
			data: {
				TotalAmount: total_amount,
				CGSTRate: cgst_rate,
				SGSTRate: sgst_rate,
				CGSTAmount: cgst_amount,
				SGSTAmount: sgst_amount,
				MenuTotal: menu_total,
				BalanceAmount: balance_amount,
				DiscountRate: discount_rate,
				DiscountPrice: discount_amount,
				PaymentMode: payment_mode,
				Status: payment_status,
			}
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

// Update Customer
interface CustomerInterface {
	bill_id: string,
	customer_id: string
}

export async function bill_customer_update({
	bill_id,
	customer_id
}: CustomerInterface) {
	try {

		// Updating the Payment
		const result = await db.bills.update({
			where: {
				id: bill_id
			},
			data: {
				CustomerId: customer_id
			}
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


// Update Table
interface TableInterface {
	bill_id: string,
	table_id: string
}

export async function bill_table_update({
	bill_id,
	table_id
}: TableInterface) {
	try {

		// Updating the Payment
		const result = await db.bills.update({
			where: {
				id: bill_id
			},
			data: {
				TableId: table_id
			}
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
