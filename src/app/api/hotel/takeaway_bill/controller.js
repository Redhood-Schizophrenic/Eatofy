import { read_menus } from "@/db/crud/menus/management/read";
import { read_menu_categories } from "@/db/crud/menus/category/read";

export async function fetch_hotel_bill_data_other(data) {
	try {

		const section_id = data['section_id']

		// Default Invalid Checker
		if ( section_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
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


		return {
			returncode: 200,
			message: "Hotel's Bills Side Fetched",
			output: [{
				Menus: menus.output,
				Categories: categories.output,
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
