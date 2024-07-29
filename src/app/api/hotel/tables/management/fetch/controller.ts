import { read_tables } from "@/db/crud/tables/management/read";
import { ApiResponse } from "@/types/ApiResponse";

// For Sorting
const extractTableNumber = (tableName) => {
	const match = tableName.match(/\d+/);
	return match ? parseInt(match[0], 10) : 0;
};

export async function fetch_table(data: any): Promise<ApiResponse> {
	try {

		const hotel_id: string | null = data['hotel_id'];

		// Default Invalid Checker
		if (hotel_id == null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Getting the Sections
		const result = await read_tables({
			hotel_id
		});

		result.output.sort((a: any, b: any) => {
			const numA = extractTableNumber(a.TableName);
			const numB = extractTableNumber(b.TableName);
			return numA - numB;
		});

		return {
			returncode: 200,
			message: "Tables Fetched",
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
