import { read_menu_for_order } from "@/db/crud/menus/management/read";
import { create_menu_of_order } from "@/db/crud/orders/management/create";
import { order_check } from "@/db/crud/orders/management/read";
import { update_order_menus } from "@/db/crud/orders/management/update";

export async function add_menu_order(data) {
	try {

		const quantity = data['quantity'] || null;
		const note = data['note'] || null;
		const menu_id = data['menu_id'] || null;
		const bill_id = data['bill_id'] || null;
		const hotel_id = data['hotel_id'] || null;


		// Default Invalid Checker
		if (quantity == null || menu_id == null || bill_id == null || hotel_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Check Menu
		const checkExistingOrder = await order_check({
			menu_id,
			bill_id
		});


		// Getting the Menu Price 
		const existingMenu = await read_menu_for_order({
			menu_id,
		});
		const amount = existingMenu.output[0].Price;
		const menu_quantity = parseFloat(quantity);
		const total_amount = menu_quantity * amount;

		if (checkExistingOrder.output.length != 0) {
		
			// Update Existing Order
			const order_quantity = checkExistingOrder.output[0].Quantity;
			const order_amount = checkExistingOrder.output[0].TotalAmount;
			const totalAmt = order_amount + total_amount;
			const totalQty = menu_quantity + parseFloat(order_quantity);
			const order_id = checkExistingOrder.output[0].id;

			const result = await update_order_menus({
				order_id,
				totalQty: `${totalQty}`,
				totalAmt
			});

			if (result.returncode != 200) {
				return {
					returncode: 200,
					message: "Menu Order Updated",
					output: result.output
				};
			}
			else {
				return result;
			}

		}
		else {

			// Inserting the Menu Order
			const result = await create_menu_of_order({
				quantity,
				note,
				total_amount,
				menu_id,
				bill_id,
				hotel_id
			});

			if (result.returncode != 200) {
				return {
					returncode: 200,
					message: "Menu Order Added",
					output: result.output
				};
			}
			else {
				return result;
			}
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
