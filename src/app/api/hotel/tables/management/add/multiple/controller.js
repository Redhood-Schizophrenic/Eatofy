export async function add_tables(data) {
	try {
		const hotel_id = data['hotel_id'] || null;
		const section_id = data['section_id'] || null;
		const count = data['count'] || null;
		let error_flag = false;

		// Default Invalid Checker
		if (!hotel_id || !section_id || typeof count !== 'number' || count <= 0) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}
		}

		let data1, table_name, persons_occupiable;
		for (let table_index = 1; table_index <= count; table_index++) { // Fix off-by-one error

			table_name = `Table ${table_index}`;
			persons_occupiable = "4";

			data1 = {
				hotel_id,
				section_id,
				table_name,
				persons_occupiable
			};

			try {

				await fetch("http://localhost:3000/api/hotel/tables/management/add/single", {
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify(data1)
				});
			} catch (error) {
				error_flag = true;
			}

		}

		if (!error_flag) {
			return {
				returncode: 200,
				message: "Tables Added",
				output: []
			};
		}
		else {
			return {
				returncode: 510,
				message: "Not all Tables Added",
				output: []
			};
		}


	} catch (error) {
		return {
			returncode: 500,
			message: error.message || 'Internal Server Error',
			output: []
		};
	}
}
