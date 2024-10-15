import { read_invoice_printer_settings } from "@/db/crud/settings/printer/invoice/management/read";
import { read_gst_settings } from "@/db/crud/settings/gst/management/read";
import { read_vat_settings } from "@/db/crud/settings/vat/management/read";
import { order_display } from "@/db/crud/orders/management/read";
import { read_bill_info } from "@/db/crud/bills/management/read";
import escpos from 'escpos';
escpos.Network = require('escpos-network');

// Global Variables
let hotel_id;
let menu_total = 0, total_amount = 0;
let cgst_rate = "0%", cgst_amount = 0, sgst_rate = "0%", sgst_amount = 0;
let vat_rate = "0%", vat_amount = 0;

export async function fetch_invoice_printer_settings(data) {
	try {

		hotel_id = data['hotel_id'] || null;
		const bill_id = data['bill_id'] || null;

		// Default Invalid Checker
		if (bill_id === null || hotel_id === null) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		const printer_settings_data = await read_invoice_printer_settings({ hotel_id });
		const printer_settings = printer_settings_data.output[0];


		const device = new escpos.Network(printer_settings.NetworkIP);  // Printer's IP address
		const options = { encoding: printer_settings.Encoding };
		const printer = new escpos.Printer(device, options);


		// Bill Info 
		const bill_data = await read_bill_info({ bill_id });
		const bill_info = bill_data.output[0];

		// Orders Info
		const orders_data = await order_display({ bill_id });
		const orders = orders_data.output;

		await values_calculator();

		if (bill_info.Type === "Dine-In") {

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
					.text(bill_info?.Hotels?.HotelName)
					.text(bill_info?.Hotels?.Address)
					.text(`Phone :- ${bill_info?.Hotels?.Contacts[0]}`)
					.text("")
					.text("")
					.text(`** ${bill_info?.Table?.TableName} **`)
					.text("")
					.text("");

				// Table Header;
				printer
					.text(formatLine("Dish", "Qty", "Price"))
					.text('--------------------------------');

				// Print Items
				orders.forEach(item => {
					const itemText = formatLine(`${item?.Menu?.Dish?.DishName}`, `${item?.Quantity}`, `${item.TotalAmount}`);
					menu_total = menu_total + item.TotalAmount;
					printer.text(itemText);
				});

				// Table Footer;
				printer
					.text('--------------------------------')
					.text(formatLine("Sub-Total", "", `${menu_total}`))
					.text(formatLine("CGST", cgst_rate, `${cgst_amount}`))
					.text(formatLine("SGST", sgst_rate, `${sgst_amount}`))
					.text(formatLine("VAT", `${vat_rate}%`, `${vat_amount}`))
					.text('--------------------------------')
					.text(formatLine("Total", "", `Rs. ${total_amount}`))
					.text('--------------------------------');




				printer
					.align('ct')
					.text("Thanks for dinning with us.")
					.text('--------------------------------')
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
					.text(bill_info?.Hotels?.HotelName)
					.text(bill_info?.Hotels?.Address)
					.text(`Phone :- ${bill_info?.Hotels?.Contacts[0]}`)
					.text("")
					.text("")
					.text(`** ${bill_info?.Type} **`)
					.text("")
					.text("");

				// Table Header;
				printer
					.text(formatLine("Dish", "Qty", "Price"))
					.text('--------------------------------');

				// Print Items
				orders.forEach(item => {
					const itemText = formatLine(`${item?.Menu?.Dish?.DishName}`, `${item?.Quantity}`, `${item.TotalAmount}`);
					menu_total = menu_total + item.TotalAmount;
					printer.text(itemText);
				});

				// Table Footer;
				printer
					.text('--------------------------------')
					.text(formatLine("Sub-Total", "", `${menu_total}`))
					.text(formatLine("CGST", cgst_rate, `${cgst_amount}`))
					.text(formatLine("SGST", sgst_rate, `${sgst_amount}`))
					.text(formatLine("VAT", `${vat_rate}%`, `${vat_amount}`))
					.text('--------------------------------')
					.text(formatLine("Total", "", `Rs. ${total_amount}`))
					.text('--------------------------------');




				printer
					.align('ct')
					.text("Thanks for dinning with us.")
					.text('--------------------------------')
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

// Assuming 32 characters per line , Utility function to create 'justify-between' layout
function formatLine(leftText, middleText, rightText) {
	const leftWidth = 16;   // Width for the Dish column
	const middleWidth = 7;  // Width for the Qty column
	const rightWidth = 7;   // Width for the Price column
	const lineLength = 32;

	// Function to split text by words and wrap to fit the width
	function wrapText(text, width) {
		const words = text.split(' ');
		let currentLine = '';
		const lines = [];

		words.forEach(word => {
			// If adding the next word exceeds the width, push the current line and start a new one
			if (currentLine.length + word.length + 1 > width) {
				lines.push(currentLine.trim());
				currentLine = word + ' ';
			} else {
				currentLine += word + ' ';
			}
		});

		// Push the last line
		if (currentLine.trim()) {
			lines.push(currentLine.trim());
		}

		return lines;
	}

	// Wrap the dish name if it's too long
	const wrappedDish = wrapText(leftText, leftWidth);

	// Create the first line with the dish, qty, and price
	const firstLine = wrappedDish[0].padEnd(leftWidth) + middleText.padStart(middleWidth) + rightText.padStart(rightWidth);

	// Create additional lines for the wrapped dish name (if any), with no qty or price
	const additionalLines = wrappedDish.slice(1).map(line => line.padEnd(lineLength));

	// Combine the first line and any additional lines
	return [firstLine, ...additionalLines].join('\n');
}

async function values_calculator() {

	// Fetching Settings
	const gst_settings_info = await read_gst_settings({ hotel_id });
	const gst_settings = gst_settings_info.output[0];
	const vat_settings_info = await read_vat_settings({ hotel_id });
	const vat_settings = vat_settings_info.output[0];

	// GST
	if (gst_settings.Visibility) {
		const gst_rate = gst_settings.GSTPercent || 0;
		if (gst_rate != 0) {
			cgst_rate = `${gst_rate / 2}%`;
			sgst_rate = cgst_rate;
			cgst_amount = (gst_rate / 100) * menu_total;
			sgst_amount = cgst_amount;
		}
	}

	// VAT
	if (vat_settings.Visibility) {
		vat_rate = vat_settings.VATPercent || 0;
		if (vat_rate != 0) {
			vat_amount = (vat_rate / 100) * menu_total;
		}
	}
	total_amount = menu_total + cgst_amount + sgst_amount + vat_amount;
}

