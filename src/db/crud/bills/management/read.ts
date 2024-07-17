import db from "@/db/connector";

// Fetch Hotel's Bills
interface HotelsInterface {
	hotel_id: string
}
export async function read_hotel_bills({
	hotel_id
}: HotelsInterface) {
	try {

		// Fetching the record
		const result = await db.bills.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
			},
			include: {
				Customer: true,
				Waiter: true,
				Table: true
			}
		});

		// Database is disconnected
		db.$disconnect();

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


// Fetch Bill Info
interface BillInterface {
	bill_id: string
}
export async function read_bill_info({
	bill_id
}: BillInterface) {
	try {

		// Fetching the record
		const result = await db.bills.findMany({
			where: {
				id: bill_id,
				NOT: {
					Status: "Inactive"
				},
			},
			include: {
				Customer: true,
				Waiter: true,
				Table: true,
				Hotels: true,
			}
		});

		// Database is disconnected
		db.$disconnect();

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

