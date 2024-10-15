import db from "@/db/connector";

// Details Update
export async function update_invoice_printer_settings({
	setting_id,
	visibility,
	network_ip,
	encoding,
	bluetooth_mac
}) {
	try {

		// Updating the record
		const result = await db.invoicePrinterSettings.update({
			where: {
				id: setting_id
			},
			data: {
				Visibility: visibility,
				NetworkIP: network_ip,
				Encoding: encoding,
				BluetoothMac: bluetooth_mac
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Updated",
			output: result
		};

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
