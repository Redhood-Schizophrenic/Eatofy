import { bill_payment } from "@/db/crud/bills/management/update";
import { update_table_status } from "@/db/crud/tables/management/update";
import { read_bill_info } from "../../../../../../../db/crud/bills/management/read";
import { read_gst_settings } from "@/db/crud/settings/gst/management/read";
import { read_vat_settings } from "@/db/crud/settings/vat/management/read";
import { read_eatocoins_settings } from "@/db/crud/settings/eatocoins/management/read";
import { update_customer_wallet } from "@/db/crud/customers/management/update";
import { read_customer_by_id } from "@/db/crud/customers/management/read";

export async function pay_bill(data) {
	try {

		const bill_id = data['bill_id'] || null;
		const table_id = data['table_id'] || null;
		const menu_total = data['menu_total'] || null;
		let eatocoins = data['eatocoins'] || 0;
		const balance_amount = data['balance_amount'] || 0;
		let discount_rate = data['discount_rate'] || 0;
		let discount_amount = 0;
		let delivery_rate = data['delivery_rate'] || 0;
		let delivery_amount = 0;
		const payment_mode = data['payment_mode'] || null;
		const payment_status = data['payment_status'] || null;

		if (bill_id === null || menu_total === null || payment_mode === null || payment_status === null) {
			return {
				returncode: 400,
				message: "Input Values missing, Please check",
				output: []
			};
		}

		// Fetching Bill info
		const bill_info_data = await read_bill_info({ bill_id });
		const bill_info = bill_info_data['output'];
		const customer_id = bill_info[0]?.CustomerId || null;
		const hotel_id = bill_info[0].HotelId;

		// GST
		const gst_settings_info = await read_gst_settings({ hotel_id });
		let cgst_rate = "0%", cgst_amount = 0, sgst_rate = "0%", sgst_amount = 0; // Initializing Values
		if (gst_settings_info.output.length != 0 && gst_settings_info.returncode === 200) {

			const gst_settings = gst_settings_info.output[0];
			if (gst_settings.Visibility) {
				const gst_rate = gst_settings.GSTPercent || 0;
				if (gst_rate != 0) {
					cgst_rate = `${gst_rate / 2}%`;
					sgst_rate = cgst_rate;
					cgst_amount = (gst_rate / 100) * menu_total;
					sgst_amount = cgst_amount;
				}
			}
		}

		// VAT
		const vat_settings_info = await read_vat_settings({ hotel_id });
		let vat_rate = "0%", vat_amount = 0;
		if (vat_settings_info.output.length != 0 && vat_settings_info.returncode === 200) {

			const vat_settings = vat_settings_info.output[0];
			if (vat_settings.Visibility) {
				vat_rate = vat_settings.VATPercent || 0;
				if (vat_rate != 0) {
					vat_amount = (vat_rate / 100) * menu_total;
				}
			}
		}

		// Eatocoins
		const eatocoins_settings_info = await read_eatocoins_settings({ hotel_id });
		if (eatocoins_settings_info.output.length != 0 && eatocoins_settings_info.returncode === 200) {

			const eatocoins_settings = eatocoins_settings_info.output[0];
			let eatocoins_rate = eatocoins_settings.RedeemLimitPercent || 0;
			let redeem_limit_amt = eatocoins_settings.RedeemLimitAmount || 0;
			let credit_limit_amt = eatocoins_settings.CreditLimitAmt || 0;
			let credit_limit_rate = eatocoins_settings.CreditLimitPercent || 0;
			let credit_eatocoins = 0;
			if (total_amount >= credit_limit_amt) {
				credit_eatocoins = (credit_limit_rate / 100) * total_amount;
			}

			if (eatocoins != 0) {

				if (eatocoins_rate != 0) {

					// Redeem limit
					if (total_amount >= redeem_limit_amt) {

						// Max Amount
						const eatocoins_max = (eatocoins_rate / 100) * total_amount;

						// If Eatocoins in input is greater than max amount
						if (eatocoins > eatocoins_max) {
							eatocoins = eatocoins_max;
						}

					}
					else {
						eatocoins = 0;
						eatocoins_rate = 0;
					}
				}

			}
			else {
				eatocoins = 0;
				eatocoins_rate = 0;
			}

		}

		// Delivery Rate
		if (delivery_rate != 0) {
			delivery_amount = (delivery_rate / 100) * menu_total;
		}

		// Total amount
		const total_amount = menu_total + cgst_amount + sgst_amount + vat_amount + delivery_amount;

		// Discount
		if (discount_rate != 0) {
			discount_amount = (discount_rate / 100) * total_amount;
		}


		// Amount
		let amount = total_amount - discount_amount - eatocoins;

		// Paying the Bill
		const result = await bill_payment({
			bill_id,
			total_amount,
			amount,
			cgst_rate,
			sgst_rate,
			cgst_amount,
			sgst_amount,
			menu_total,
			balance_amount,
			discount_rate: `${discount_rate}%`,
			discount_amount,
			payment_mode,
			payment_status,
			vat_rate: `${vat_rate}%`,
			vat_amount,
			delivery_rate: `${delivery_rate}%`,
			delivery_amount,
			eatocoins_rate: `${eatocoins_rate}%`,
			eatocoins
		});

		// Update Table Status as Booked
		if (table_id != null) {
			await update_table_status({
				table_id,
				status: "Active"
			});
		}
		console.log("Eatocoins", credit_eatocoins);

		if (customer_id != null) {
			const customer_info = await read_customer_by_id({ customer_id });
			const eato_wallet = customer_info.output[0].EatocoinsWallet;

			if (eato_wallet > eatocoins) {

				credit_eatocoins = eato_wallet - eatocoins + credit_eatocoins;

				await update_customer_wallet({
					customer_id,
					eatocoins: credit_eatocoins
				});
			}
			else if (credit_eatocoins > 0) {
				credit_eatocoins = eato_wallet + credit_eatocoins;

				await update_customer_wallet({
					customer_id,
					eatocoins: credit_eatocoins
				});
			}

		}

		if (result.returncode == 200) {

			return {
				returncode: 200,
				message: "Bill Payment Updated",
				output: result.output
			};
		}
		else {
			return result;
		}

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
