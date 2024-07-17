import db from "@/db/connector";

interface ExpenseInterface {
	hotel_id: string,
	expense_name: string,
	note: string | null,
	date: string,
	payable_to: string,
	amount_payable: number,
	amount_paid: number,
	status: string
}

export async function create_expense({
	hotel_id,
	expense_name,
	note,
	date,
	payable_to,
	amount_payable,
	amount_paid,
	status
}: ExpenseInterface) {
	try {

		// Inserting the record
		const result = await db.expenses.create({
			data: {
				HotelId: hotel_id,
				ExpenseName: expense_name,
				Note: note,
				Date: date,
				PayableTo: payable_to,
				AmountPayable: amount_payable,
				AmountPaid: amount_paid,
				Status: status
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
