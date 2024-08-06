import { add_menu_order } from "../controller";

export async function add_menu_orders(data) {
	try {

		const response_data = data['data'] || null;

		// Default Invalid Checker
		if (response_data == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		let error_flag = false;
		response_data.forEach((element) => {
			try {

				const menu_orders_added = add_menu_order(element);
				if (menu_orders_added.returncode != 200) {
					return {
						returncode: 200,
						message: "Menu Orders Added",
						output: []
					};

				}
			} catch (error) {
				error_flag = true
			}
		});

		if (!error_flag) {
			return {
				returncode: 200,
				message: "Menu Orders Added",
				output: []
			};
		}
		else {
			return {
				returncode: 510,
				message: "Not all Menu Orders Added",
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
