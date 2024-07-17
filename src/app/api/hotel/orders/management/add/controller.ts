import { ApiResponse } from "@/types/ApiResponse";
import { update_table_status } from "@/db/crud/tables/management/update";
import { create_bill } from "@/db/crud/bills/management/create";
import { read_customer } from "@/db/crud/customers/management/read";
import { create_customer } from "@/db/crud/customers/management/create";
import { create_customer_occassion } from "@/db/crud/customers/occasions/create";

interface MenuOrder {
	quantity: string;
	menu_id: string;
	note: string | null;
}

interface MenuRequestOptionalOrder {
	quantity: string;
	menu_id: string;
	bill_id: string;
	hotel_id: string;
}

interface MenuRequestOrder {
	quantity: string;
	menu_id: string;
	bill_id: string;
	note: string | null;
	hotel_id: string;
}

const api_host = process.env.NEXT_URL || "http://localhost:3000/";

export async function add__order(data: any): Promise<ApiResponse> {
	try {
		// CRM params
		let customer_name: string | null = data['customer_name'];
		let contact: string | null = data['contact'];
		const email: string | null = data['email'];
		const occassion: string | null = data['occassion'];
		const date: string | null = data['date'];

		// Order Params
		const type: string | null = data['type'];
		const table_id: string | null = data['table_id'];
		const waiter_id: string | null = data['waiter_id'];
		const hotel_id: string | null = data['hotel_id'];
		const menu_data: Array<MenuOrder> | any | null = data['menu_data'];

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

				customer_id = (result.output as { id: string }).id;
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

		if (result.returncode == 200) {
			for (const element of menu_data) {
				let menu_id: string = element['menu_id'];
				let quantity: string = element['quantity'];
				let note: string | null = element['note'];
				let bill_id: string = (result.output as { id: string }).id;

				let menu_request: MenuRequestOrder | MenuRequestOptionalOrder;
				if(note != null || note != undefined) {
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

				console.log(menu_request);

				try {
					let out = await fetch(`${api_host}/api/hotel/orders/menus/add`, {
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						method: "POST",
						body: JSON.stringify(menu_request)
					});

					console.log(out);
				} catch (error) {
					console.error(error);
				}
			}

			return {
				returncode: 200,
				message: "Order Added",
				output: result.output
			};
		} else {
			return result;
		}
	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
