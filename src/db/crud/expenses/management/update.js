import db from "@/db/connector";

// Section Name Update
export async function update_expense({
	expense_id,
	date,
	amount_paid,
	amount_payable,
	note,
	status,
	payment_mode
}) {
	try {

		// Updating the record
		const result = await db.expenses.update({
			where: {
				id: expense_id
			},
			data: {
				Date: date,
				AmountPayable: amount_payable,
				AmountPaid: amount_paid,
				Note: note,
				PaymentStatus: status,
				PaymentMode: payment_mode
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

// Expense Status Update
export async function update_expense_status({
	expense_id,
	status
}) {
	try {

		// Updating the record
		const result = await db.expenses.update({
			where: {
				id: expense_id
			},
			data: {
				Status: status
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
