import db from "@/db/connector";

// Bill Payment
export async function bill_payment({
	bill_id,
	amount,
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
	payment_status,
	vat_rate,
	vat_amount,
	delivery_rate,
	delivery_amount,
	eatocoins_rate,
	eatocoins
}) {
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
				Amount: amount,
				BalanceAmount: balance_amount,
				DiscountRate: discount_rate,
				DiscountPrice: discount_amount,
				PaymentMode: payment_mode,
				Status: payment_status,
				VatRate: vat_rate,
				VatAmount: vat_amount,
				DeliveryChargesRate: delivery_rate,
				DeliveryChargesAmount: delivery_amount,
				EatocoinsRate: eatocoins_rate,
				EatocoinsAmount: eatocoins
			}
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

// Update Customer
export async function bill_customer_update({
	bill_id,
	customer_id
}) {
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

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}


// Update Table

export async function bill_table_update({
	bill_id,
	table_id
}) {
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

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Update Table Status
export async function bill_status_update({
	bill_id,
	status
}) {
	try {

		// Updating the Payment
		const result = await db.bills.update({
			where: {
				id: bill_id
			},
			data: {
				Status: status
			}
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
