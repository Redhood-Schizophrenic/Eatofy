import { update_available_stock_quantity, update_available_stock_status } from "@/db/crud/inventory/available_stock/update";

export async function update_available_quantity(data) {

	try {

		const available_stock_id = data['available_stock_id'] || null;
		const quantity = data['quantity'] || null;

		// Default Invalid Checker
		if (available_stock_id == null || quantity == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		let status;
		if (parseFloat(quantity) == 0) {
			status = "Unavailable";
		} else if (parseFloat(quantity) <= 20) {
			status = "Low Stock";
		} else {
			status = "Available";
		}

		// Updating the Quantity
		const result = await update_available_stock_quantity({
			available_stock_id,
			quantity
		});

		if (result.returncode == 200) {

			const status_result = await update_available_stock_status({
				available_stock_id,
				status
			});

			if (status_result.returncode == 200) {

				return {
					returncode: 200,
					message: "Quantity Updated",
					output: result.output
				};
			}
			else {
				return status_result;
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
