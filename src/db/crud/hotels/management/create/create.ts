import db from "@/db/connector";

interface HotelInterface {
	hotel_name: string,
	email: string,
	hashedPassword: string,
	address: string,
	specialities: Array<string>,
	buffer: Buffer | null,
	contacts: Array<string>,
	website: string | null,
	fssai_code: string
}

// With Logo
export async function create_hotel_with_logo({
	hotel_name,
	email,
	hashedPassword,
	address,
	specialities,
	buffer,
	contacts,
	website,
	fssai_code
}: HotelInterface){
	try {
		// Inserting the Hotel
		const result = await db.hotels.create({
			data: {
				HotelName: hotel_name,
				Email: email,
				HashedPassword: hashedPassword,
				SaltPassword: "10",
				Address: address,
				Speciality: specialities,
				HotelLogo: buffer,
				Contacts: contacts,
				Website: website,
				FSSAICode: fssai_code
			},
		});

		// Database is disconnected
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
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

// Without Logo
export async function create_hotel_without_logo({
	hotel_name,
	email,
	hashedPassword,
	address,
	specialities,
	contacts,
	website,
	fssai_code,
}: HotelInterface) {
	try {

		// Inserting the Hotel
		const result = await db.hotels.create({
			data: {

				HotelName: hotel_name,
				Email: email,
				HashedPassword: hashedPassword,
				SaltPassword: "10",
				Address: address,
				Speciality: specialities,
				Contacts: contacts,
				Website: website,
				FSSAICode: fssai_code
			},
		});

		// Disconnect the Database
		db.$disconnect();

		return {
			returncode: 200,
			message: "Data Inserted",
			output: result
		};

	} catch (error: any) {
		
		// Error thrown
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}

