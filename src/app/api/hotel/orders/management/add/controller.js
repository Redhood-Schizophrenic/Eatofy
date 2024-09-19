import { update_table_status } from "@/db/crud/tables/management/update";
import { create_bill } from "@/db/crud/bills/management/create";
import { read_customer } from "@/db/crud/customers/management/read";
import { create_customer } from "@/db/crud/customers/management/create";
import { create_customer_occassion } from "@/db/crud/customers/occasions/create";
import { add_menu_order } from "../../menus/add/controller";
import { bill_status_update } from "@/db/crud/bills/management/update";

export async function add__order(data) {
	try {
		// CRM params
		let customer_name = data['customer_name'] || null;
		let contact = data['contact'] || null;
		const email = data['email'] || null;
		const occassion = data['occassion'] || null;
		const date = data['date'] || null;

		// Order Params
		const type = data['type'] || null;
		const table_id = data['table_id'] || null;
		const waiter_id = data['waiter_id'] || null;
		const hotel_id = data['hotel_id'] || null;
		const menu_data = data['menu_data'] || null;

		// Default Invalid Checker
		if (hotel_id == null || type == null || waiter_id == null || menu_data == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			};
		}

		// Update Table Status as Booked
		if (table_id != null) {
			await update_table_status({
				table_id,
				status: "Booked"
			});
		}

		// Customer
		let customer_id;

		if (customer_name != null && contact != null) {
			// Existing Customer
			const existingCustomer = await read_customer({ customer_name, contact });
			if (existingCustomer.returncode != 200) {
				// Adding the Customer
				const result = await create_customer({
					customer_name,
					contact,
					email,
					hotel_id
				});

				customer_id =  result.output;
				// If occassion exists
				if (occassion != null && date != null) {
					await create_customer_occassion({
						customer_id: customer_id,
						occassion,
						date
					});
				}
			} else {
				customer_id = existingCustomer.output[0].id;
			}
		} else {
			customer_id = null;
		}

		// Inserting the Order
		const result = await create_bill({
			type,
			table_id,
			waiter_id,
			hotel_id,
			customer_id
		});

		let OrdersArray = [];
		let isAllOrdersAdded = true;

		// Update Bill Status
		await bill_status_update({
			bill_id:  result.output,
			status: "Booked"
		});

		if (result.returncode == 200) {
			for (const element of menu_data) {
				let menu_id = element['menu_id']; 
				let quantity = element['quantity'];
				let note = element['note'];
				let bill_id =  result.output.id;

				let menu_request;
				if (note != null || note != undefined) {
					menu_request = {
						menu_id,
						quantity,
						note,
						bill_id,
						hotel_id
					};
				}
				else {
					menu_request = {
						menu_id,
						quantity,
						bill_id,
						hotel_id
					}
				}

				try {
					let out = await add_menu_order(menu_request);
					if (out.returncode == 200) {
						OrdersArray.push(out.output);
					}
					else {
						isAllOrdersAdded = false; 
					}
				} catch (error) {
					isAllOrdersAdded = false;
					console.error(error);
				}
			}

			if (isAllOrdersAdded == true) {
				return {
					returncode: 200,
					message: "Orders Added",
					output: [
						{
							Bill: result.output,
							Orders: OrdersArray
						}
					]
				}
			}
			else {
				return {
					returncode: 510,
					message: "Some Orders aren't Added",
					output: [
						{
							Bill: result.output,
							Orders: OrdersArray
						}
					]
				}
			}

		}
		 else {
			return result;
		}
	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
