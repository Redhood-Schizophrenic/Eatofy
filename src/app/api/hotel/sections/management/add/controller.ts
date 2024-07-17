import { create_section } from "@/db/crud/sections/management/create";
import { ApiResponse } from "@/types/ApiResponse";
import { read_section } from "@/db/crud/sections/management/read";

export async function add_section(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];
		const section_name: string | null = data['section_name'];

		// Default Invalid Checker
		if ( hotel_id == null || section_name == null ) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Existing Section Name
		const existingSectionName = await read_section({ section_name });
		if ( existingSectionName.returncode != 200 ) {
			return existingSectionName;
		}

		// Inserting the Section
		const result = await create_section({
			hotel_id,
			section_name
		});

		return {
			returncode: 200,
			message: "Section Added",
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
