import db from "@/db/connector";

export async function create_expense({
	hotel_id,
	expense_name,
	note,
	date,
	payable_to,
	amount_payable,
	amount_paid,
	status,
	payment_mode
}) {
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
				PaymentStatus: status,
				PaymentMode: payment_mode
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
