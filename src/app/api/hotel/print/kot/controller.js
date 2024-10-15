import { read_kot_printer_settings } from "@/db/crud/settings/printer/kot/management/read";
import escpos from 'escpos';
escpos.Network = require('escpos-network');

export async function fetch_invoice_printer_settings(data) {
	try {

		const cart = data['cart'] || null;
		const type = data['type'] || null;
		const hotel_id = data['hotel_id'] || null;
		const table_name = data['table_name'] || null;

		// Default Invalid Checker
		if (cart === null || type === null || hotel_id === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const printer_settings_data = await read_kot_printer_settings({ hotel_id });
		const printer_settings = printer_settings_data.output[0];


		const device = new escpos.Network(printer_settings.NetworkIP);  // Printer's IP address
		const options = { encoding: printer_settings.Encoding };
		const printer = new escpos.Printer(device, options);

		// Assuming 32 characters per line for this example
		const lineLength = 32;

		// Utility function to create 'justify-between' layout
		function formatLine(leftText, rightText) {
			const totalLength = leftText.length + rightText.length;
			const spaces = lineLength - totalLength;
			return leftText + ' '.repeat(spaces) + rightText;
		}

		if (type === "Dine-In") {

			device.open(function(error) {
				if (error) {
					return {
						returncode: 500,
						message: error.message,
						output: []
					};
				}

				// Print Header
				printer
					.align('ct')
					.text(`** ${table_name} **`)
					.text("")
					.text("");

				printer
					.text(formatLine("Items", "Qty"))
					.text('------------------------');

				// Print Items
				cart.forEach(item => {
					const itemText = formatLine(`${item.Dish.DishName}`, `${item.quantity}`);
					printer.text(itemText);
				});

				printer
					.text('------------------------')
					.cut()
					.close();
			});

		}
		else {
			device.open(function(error) {
				if (error) {
					return {
						returncode: 500,
						message: error.message,
						output: []
					};
				}

				// Print Header
				printer
					.align('ct')
					.text(`** ${type} **`)
					.text("")
					.text("");

				printer
					.text(formatLine("Items", "Qty"))
					.text('------------------------');


				// Print Items
				cart.forEach(item => {
					const itemText = formatLine(`${item.Dish.DishName}`, `${item.quantity}`);
					printer.text(itemText);
				});

				printer
					.text('------------------------')
					.cut()
					.close();
			});

		}

		return {
			returncode: 200,
			message: "Kot Printed",
			output: []
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
