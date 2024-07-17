import db from "@/db/connector";

// Section Name Update
interface ExpenseInterface {
	expense_id: string,
	date: string,
	amount_paid: number,
	amount_payable: number,
	note: string | null,
	status: string
}

export async function update_expense({
	expense_id,
	date,
	amount_paid,
	amount_payable,
	note,
	status
}: ExpenseInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Expense Status Update
interface ExpenseStatusInterface {
	expense_id: string,
	status: string
}

export async function update_expense_status({
	expense_id,
	status
}: ExpenseStatusInterface) {
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

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
