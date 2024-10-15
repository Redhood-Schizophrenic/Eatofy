import db from "@/db/connector";

// Without Image
export async function create_invoice_printer_settings({
	visibility,
	hotel_id,
	network_ip,
	encoding,
	bluetooth_mac
}) {
	try {

		// Inserting the Data
		const result = await db.invoicePrinterSettings.create({
			data: {
				HotelId: hotel_id,
				Visibility: visibility,
				NetworkIP: network_ip,
				Encoding: encoding,
				BluetoothMac: bluetooth_mac
			},
		});
		visibility
		// Disconnect the Database
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error) {

		// Error thrown
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
