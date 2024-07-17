import db from "@/db/connector";

// Exisiting Subscriptions
interface ExistingSubscriptionInterface {
	hotel_id: string	
}

export async function read_existing_subscription({
	hotel_id
}: ExistingSubscriptionInterface) {
	try {

		const result = await db.hotel_Subscription.findMany({
			where: {
				HotelId: hotel_id,
				isValid: true
			},
		});

		// Database is disconnected
		db.$disconnect();
 
		if (result.length == 0) {
			return {
				returncode: 400,
				message: "No current subscription",
				output: result
			};
		}

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Valid Subscriptions of Hotel
export async function read_valid_subscription({
	hotel_id
}: ExistingSubscriptionInterface) {
	try {

		const result = await db.hotel_Subscription.findMany({
			where: {
				HotelId: hotel_id,
				isValid: true
			},
		});

		// Database is disconnected
		db.$disconnect();
 
		if (result.length == 0) {
			return {
				returncode: 400,
				message: "No current subscription",
				output: result
			};
		}

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Valid Subscriptions
export async function read_valid_subscriptions() {
	try {

		const result = await db.hotel_Subscription.findMany({
			where: {
				isValid: true
			},
		});

		// Database is disconnected
		db.$disconnect();
 
		if (result.length == 0) {
			return {
				returncode: 400,
				message: "No current subscription",
				output: result
			};
		}

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}


// Subscriptions of Hotel
export async function read_hotel_subscription({
	hotel_id
}: ExistingSubscriptionInterface) {
	try {

		const result = await db.hotel_Subscription.findMany({
			where: {
				HotelId: hotel_id
			},
		});

		// Database is disconnected
		db.$disconnect();
 
		if (result.length == 0) {
			return {
				returncode: 400,
				message: "No current subscription",
				output: result
			};
		}

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// All Hotel Subscriptions
export async function read_all_subscriptions() {
	try {

		const result = await db.hotel_Subscription.findMany();

		// Database is disconnected
		db.$disconnect();
 
		if (result.length == 0) {
			return {
				returncode: 400,
				message: "No current subscription",
				output: result
			};
		}

		return {
			returncode: 200,
			message: "Data Fetched",
			output: result
		};

	} catch (error: any) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}
