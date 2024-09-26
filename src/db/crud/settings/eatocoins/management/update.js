import db from "@/db/connector";

// Details Update
export async function update_eatocoins_settings({
	hotel_id,
	rate,
	visibility,
	credit_limit_amt,
	credit_limit_percent,
	redeem_limit_amt,
	redeem_limit_percent
}) {
	try {

		// Updating the record
		const result = await db.eatocoinsSettings.create({
			data: {
				HotelId: hotel_id,
				Visibility: visibility,
				CreditLimitAmt: credit_limit_amt,
				CreditLimitPercent: credit_limit_percent,
				RedeemLimitAmount: redeem_limit_amt,
				RedeemLimitPercent: redeem_limit_percent,
				Rate: rate
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
