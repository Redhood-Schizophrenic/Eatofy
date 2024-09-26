import db from "@/db/connector";

// Without Image
export async function create_eatocoins_settings({
	visibility,
	hotel_id,
	credit_limit_amt,
	credit_limit_percent,
	redeem_limit_amt,
	redeem_limit_percent,
	rate
}) {
	try {

		// Inserting the Data
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
