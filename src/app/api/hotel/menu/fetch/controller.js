import { read_hotel_menus } from "@/db/crud/menus/management/read";
import { read_sections } from "@/db/crud/sections/management/read";

export async function fetch_hotel_menus(data) {
	try {

		const hotel_id = data['hotel_id'];

		// Default Invalid Checker
		if (hotel_id == null || hotel_id == undefined || hotel_id == "") {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Menus
		const menu_result = await read_hotel_menus({
			hotel_id
		});

		//Getting the Sections
		const section_result = await read_sections({
			hotel_id
		})

		if ( menu_result.returncode == 200 && section_result.returncode == 200 ) {
			return {
				returncode: 200,
				message: "Hotel's Menus Fetched",
				output: [
					{
						Menus: menu_result.output,
						Sections: section_result.output
					}
				]
			};
		}
		else {
			return {
				returncode: 503,
				message: "Error Fetching Results",
				output: []
			};
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
