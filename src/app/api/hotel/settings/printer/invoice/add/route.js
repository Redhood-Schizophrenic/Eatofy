import { add_invoice_printer_settings } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await add_invoice_printer_settings(data);
		return Response.json(
			{
				returncode: result.returncode,
				message: result.message,
				output: result.output
			},
			{
				status: result.returncode
			}
		);
	}
	catch (error) {
		return Response.json(
			{
				returncode: 500,
				message: `Error Adding Invoice Printer Settings: ${error.message}`,
				output: []
			},
			{
				status: 500
			}
		);
	}
}
