import db from "@/db/connector";

// Fetch Hotel's Bills by type
export async function read_hotel_bills_by_type({
	hotel_id,
	type
}) {
	try {

		// Fetching the record
		const result = await db.bills.findMany({
			where: {
				HotelId: hotel_id,
				Type: type,
				NOT: {
					Status: "Inactive"
				},
			},
			orderBy:{
				createdAt: 'desc'
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch Hotel's Bills
export async function read_hotel_bills_asc({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.bills.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
			},
			orderBy: {
				createdAt: 'asc'
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Fetch Hotel's Bills
export async function read_hotel_bills({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.bills.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
			},
			orderBy: {
				createdAt: 'desc'
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Check Bill Exists
export async function read_bill_info_by_table({
	table_id
}) {
	try {

		// Fetching the record
		const result = await db.bills.findMany({
			where: {
				TableId: table_id,
				Status: "Booked",
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				Table: true,
				Hotels: true
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Fetched",
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

// Fetch Bill Info
export async function read_bill_info({
	bill_id
}) {
	try {

		// Fetching the record
		const result = await db.bills.findMany({
			where: {
				id: bill_id,
				NOT: {
					Status: "Inactive"
				},
			},
			orderBy: {
				createdAt: 'desc'
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

	} catch (error) {

		return {
			returncode: 500,
			message: error.message,
			output: []
		};

	}
}

// Staff Report
export async function read_bill_info_by_staff({
	staff_id
}) {
	try {

		// Fetching the record
		const result = await db.bills.findMany({
			where: {
				WaiterId: staff_id,
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				Waiter: true,
				Table: true,
				Customer: true
			}
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Fetched",
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
