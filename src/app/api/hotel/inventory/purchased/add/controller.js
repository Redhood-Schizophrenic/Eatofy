import { create_invoice } from "@/db/crud/inventory/purchases/invoices/create";
import { add_purchase_stock } from "../stock/management/add/controller";
// import { add_expense } from "../../../expenses/management/add/controller";

export async function add_invoice(data) {
	try {

		const invoice_no  = data['invoice_no']
		const payment_mode = data['payment_mode'];
		const total_amount = data['total_amount'];
		const balance_amount = data['balance_amount'];
		const payment_status = data['payment_status'];
		const supplier_id = data['supplier_id'];
		const hotel_id = data['hotel_id'];
		const invoice_date = data['invoice_date'];
		const stock_data = data['stock_data']; 
		
		// Default Invalid Checker
		if ( total_amount == null || payment_status == null || balance_amount == null || payment_status == null || supplier_id == null || hotel_id == null || invoice_date == null || invoice_no == null || stock_data == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Inserting the Purchase Order
		const result = await create_invoice({
			invoice_no,
			payment_mode,
			total_amount,
			balance_amount,
			payment_status,
			supplier_id,
			hotel_id,
			invoice_date
		});

		if ( result.returncode == 200 ) {

			const invoice_id = result.output.id;

			stock_data.forEach((stock) => {
				const data = {
					invoice_id,
					quantity: stock.quantity,
					unit: stock.unit,
					item_id: stock.item_id,
					per_price: stock.per_price,
					hotel_id,
					total_price: `${stock.total_price}`
				}

				const stock_result = add_purchase_stock(data);
				if(stock_result.returncode != 200)
				{
					return stock_result; 
				}
			});
			return {
				returncode: 200,
				message: "Purchase Record Added",
				output: result.output
			};
		}
		else {
			return result
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
