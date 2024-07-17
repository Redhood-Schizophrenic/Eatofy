import { ApiResponse } from "@/types/ApiResponse";
import { read_menus } from "@/db/crud/menus/management/read";

export async function fetch_menus(data: any): Promise<ApiResponse> {
	try {

		const section_id: string | null = data['section_id'];

		// Default Invalid Checker
		if ( section_id == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_menus({
			section_id
		});

		return {
			returncode: 200,
			message: "Hotel's Menus Fetched",
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
