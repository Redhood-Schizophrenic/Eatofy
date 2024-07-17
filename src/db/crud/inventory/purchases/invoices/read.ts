import db from "@/db/connector";

// Fetch all Invoices
interface InvoicesInterface {
	hotel_id: string
}

export async function read_invoices ({
	hotel_id
}: InvoicesInterface) {
	try {

		// Fetching the record
		const result = await db.purchasedInvoice.findMany({
			where: {
				HotelId: hotel_id,
				NOT: {
					Status: "Inactive"
				},
			},
			include: {
				Suppliers: true
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

// Filter by Supplier
interface SupplierInterface {
	supplier_id: string
}

export async function read_invoice_by_supplier ({
	supplier_id
}: SupplierInterface) {
	try {

		// Fetching the record
		const result = await db.purchasedInvoice.findMany({
			where: {
				SupplierId: supplier_id,
				NOT: {
					Status: "Inactive"
				},
			},
			include: {
				Suppliers: true
			}
		});

		// Database is disconnected
		db.$disconnect();

		if(result.length==0){
			return {
				returncode: 400,
				message: "Item doesn't exist",
				output: []
			}
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

// Filter by Payment Status
interface PaymentStatusInterface {
	payment_status: string
}

export async function read_invoice_by_payment_status ({
	payment_status
}: PaymentStatusInterface) {
	try {

		// Fetching the record
		const result = await db.purchasedInvoice.findMany({
			where: {
				PaymentStatus: payment_status,
				NOT: {
					Status: "Inactive"
				},
			},
			include: {
				Suppliers: true
			}
		});

		// Database is disconnected
		db.$disconnect();

		if(result.length==0){
			return {
				returncode: 400,
				message: "Item doesn't exist",
				output: []
			}
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

// Filter by Date
interface DateInterface {
	invoice_date: string
}

export async function read_invoice_by_date ({
	invoice_date
}: DateInterface) {
	try {

		// Fetching the record
		const result = await db.purchasedInvoice.findMany({
			where: {
				Date: invoice_date,
				NOT: {
					Status: "Inactive"
				},
			},
			include: {
				Suppliers: true
			}
		});

		// Database is disconnected
		db.$disconnect();

		if(result.length==0){
			return {
				returncode: 400,
				message: "Item doesn't exist",
				output: []
			}
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
