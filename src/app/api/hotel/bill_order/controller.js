import { read_bill_info_by_table } from "@/db/crud/bills/management/read";
import { read_menus } from "@/db/crud/menus/management/read";
import { read_menu_categories } from "@/db/crud/menus/category/read";
import { order_display } from "@/db/crud/orders/management/read";
import { read_table_info } from "@/db/crud/tables/management/read";

export async function fetch_hotel_bill_data(data) {
	try {

		const table_id = data['table_id'];
		const section_id = data['section_id']

		// Default Invalid Checker
		if ( table_id == null || section_id == null || 
			table_id == undefined || section_id == undefined ||
			table_id == "" || section_id == ""
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Bill
		const existing_bill = await read_bill_info_by_table({
			table_id
		});

		let fetched_orders;
		if ( existing_bill.returncode == 200 && existing_bill.output.length != 0 ) {

			const bill_id = existing_bill.output[0].id;

			if( bill_id != null || bill_id!= undefined || bill_id == "" ) {

				//Orders
				const orders = await order_display({
					bill_id
				});

				if ( orders.returncode == 200 && orders.output.length != 0 ) {
					fetched_orders = orders.output;
				}
			}
		}

		// Menu
		const menus = await read_menus({
			section_id
		});

		const hotel_id = menus.output[0].Section.HotelId;

		//Categories
		const categories = await read_menu_categories({
			hotel_id
		});

		// Table
		const table_info = await read_table_info({table_id}); 

		return {
			returncode: 200,
			message: "Hotel's Bills Side Fetched",
			output: [{
				ExistingBill: existing_bill.output,
				Menus: menus.output,
				Categories: categories.output,
				Orders: fetched_orders,
				TableInfo: table_info.output
			}]
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
