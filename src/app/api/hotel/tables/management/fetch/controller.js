import { read_tables } from "@/db/crud/tables/management/read";

// For Sorting
const extractTableNumber = (tableName) => {
	const match = tableName.match(/\d+/);
	return match ? parseInt(match[0], 10) : 0;
};

export async function fetch_table(data) {
	try {

		const hotel_id = data['hotel_id'] || null;

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

		if (result.output.length != 0 && result.returncode == 200) {

			result.output.sort((a, b) => {
				const numA = extractTableNumber(a.TableName);
				const numB = extractTableNumber(b.TableName);
				return numA - numB;
			});

			return {
				returncode: 200,
				message: "Tables Fetched",
				output: result.output
			};
		}

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
