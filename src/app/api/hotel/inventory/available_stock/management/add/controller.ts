import { ApiResponse } from "@/types/ApiResponse";
import { create_available_stock } from "@/db/crud/inventory/available_stock/create";
import { check_available_stock } from "@/db/crud/inventory/available_stock/read";

export async function add_available_stock(data: any): Promise<ApiResponse> {
	try {

		const item_id: string | null = data['item_id'];
		const quantity: string | null = data['quantity'];
		const unit: string | null = data['unit'];
		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if ( item_id == null || quantity == null || unit == null || hotel_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const check = await check_available_stock({
			item_id,
			hotel_id
		});

		if ( check.output.length == 0 ) {

			// Inserting the Available Stock
			const result = await create_available_stock({
				item_id,
				quantity,
				unit,
				hotel_id
			});

			return {
				returncode: 200,
				message: "Available Stock Added",
				output: result.output
			};
		}
		else {
			return {
				returncode: 500,
				message: "Item Available use Edit",
				output: []
			}
		}



	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
