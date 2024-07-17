import { ApiResponse } from "@/types/ApiResponse";
import { update_menu_status } from "@/db/crud/menus/management/update";

export async function update_menu(data: any): Promise<ApiResponse> {
	try {

		const menu_id: string | null = data['menu_id'];
		const status: string | null = data['status'];

		// Default Invalid Checker
		if ( menu_id == null || status == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Status
		const result = await update_menu_status({
			menu_id,
			status
		});

		return {
			returncode: 200,
			message: "Status Updated",
			output: result.output
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
