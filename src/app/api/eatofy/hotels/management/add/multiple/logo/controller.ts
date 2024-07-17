import { ApiResponse } from "@/types/ApiResponse";
import { add_hotel } from "../../single/logo/controller";

export async function add_hotels(data: any): Promise<ApiResponse> {
	try {

		const records: Array<any> | null = data['records'];

		if(records==null)
		{
			return {
				returncode: 400,
				message: "Invalid Input Format.",
				output: []
			}
		}

		records.forEach(record => {
			add_hotel(record);
		});

		return {
			returncode: 200,
			message: "Hotels Added.",
			output: []
		};

	} catch (error: any) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
