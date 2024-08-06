import { create_cancelled_order } from "@/db/crud/orders/cancelled/create";
import { cancelled_order_check } from "@/db/crud/orders/cancelled/read";
import { update_order_status } from "@/db/crud/orders/management/update";

export async function add_cancelled_order(data) {
	try {

		const order_id = data['order_id'] || null;
		const reason = data['reason'] || null;

		// Default Invalid Checker
		if (order_id == null || reason == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			};
		}

		// Check Order Exists
		const existingOrder = await cancelled_order_check({
			order_id,
		});

		if (existingOrder.output.length != 0) {
			return {
				returncode: 200,
				message: "Cancelled Order Exists",
				output: existingOrder.output,
			}
		}

		// Updating the Order
		const order_status = await update_order_status({
			order_id,
			status: "Inactive"
		});

		if (order_status.returncode == 200) {

			// Inserting the Cancelled Order
			const result = await create_cancelled_order({
				order_id,
				reason
			});

			if (result.returncode == 200) {

				return {
					returncode: 200,
					message: "Cancelled Order Added",
					output: result.output,
				}
			}
			else {
				return {
					returncode: 500,
					message: "Orders not deleted",
					output: []
				}
			}

		}
		else {
			return {
				returncode: 500,
				message: "Orders not deleted",
				output: []
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
