import db from "@/db/connector";

// Fetch hotel menu
export async function read_hotel_menus({
	hotel_id
}) {
	try {

		// Fetching the record
		const result = await db.menus.findMany({
			where: {
				Section: {
					HotelId: hotel_id,
					NOT: {
						Status: "Inactive",
					}
				},
				Dish: {
					Category: {
						NOT: {
							Status: "Inactive"
						}
					},
					NOT: {
						Status: "Inactive"
					}
				},
				NOT: {
					Status: "Inactive"
				}
			},
			orderBy: {
				Dish: {
					DishName: "asc"
				}
			},
			include: {
				Dish: {
					include: {
						Category: true
					}
				},
				Section: true
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

// Fetch all menu
export async function read_menus({
	section_id
}) {
	try {

		// Fetching the record
		const result = await db.menus.findMany({
			where: {
				SectionId: section_id,
				NOT: {
					Status: "Inactive"
				},
				Dish: {
					Category: {
						NOT: {
							Status: "Inactive"
						}
					},
					NOT: {
						Status: "Inactive"
					}
				}
			},
			orderBy: {
				Dish: {
					DishName: "asc"
				}
			},
			include: {
				Section: true,
				Dish: {
					include: {
						Category: true
					}
				}

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

// Check if menu exists
export async function read_menu({
	dish_id,
	section_id
}) {
	try {

		// Fetching the record
		const result = await db.menus.findMany({
			where: {
				DishId: dish_id,
				SectionId: section_id,
				Dish: {
					Category: {
						NOT: {
							Status: "Inactive"
						}
					},
					NOT: {
						Status: "Inactive"
					}
				},
				NOT: {
					Status: "Inactive"
				}

			}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Category doesn't exist",
				output: []
			}
		}

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

// Check if menu exists
export async function read_menu_for_order({
	menu_id
}) {
	try {

		// Fetching the record
		const result = await db.menus.findMany({
			where: {
				id: menu_id,
				Dish: {
					Category: {
						NOT: {
							Status: "Inactive"
						}
					},
					NOT: {
						Status: "Inactive"
					}
				},
				NOT: {
					Status: "Inactive"
				}
}
		});

		// Database is disconnected
		db.$disconnect();

		if (result.length == 0) {
			return {
				returncode: 400,
				message: "Category doesn't exist",
				output: []
			}
		}

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
