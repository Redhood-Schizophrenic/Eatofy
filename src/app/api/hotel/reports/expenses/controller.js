import { read_expenses_asc } from "@/db/crud/expenses/management/read";
import { values_mapper } from "./utils";

export async function fetch_expenses_reports(data) {
	try {

		const hotel_id = data['hotel_id'];
		const from = data['from'];
		const to = data['to'];

		// Default Invalid Checker
		if ( hotel_id == null || hotel_id == undefined || hotel_id == "" ||
			from == null || from == undefined || from == "" ||
			to == null || to == undefined || to == "" ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}
		const from_date = new Date(from);
		const to_date = new Date(to);

		// Expenses
		const response = await read_expenses_asc({
			hotel_id
		});

		const expense_res = response.output;
		let expenses = expense_res.filter((expense) => {
			expense.Datetime = new Date(expense.Date);
			return from_date <= expense.Datetime && expense.Datetime <= to_date;
		});

		const expense_wise = values_mapper(expenses, "ExpenseName");
		let amount = 0;
		expense_wise.Amount.map((expense) => { amount += expense });

		return {
			returncode: 200,
			message: "Expense Reports",
			output: {
				ExpenseWise: expense_wise,
				FullData: expenses,
				TotalAmount: amount
			}
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
