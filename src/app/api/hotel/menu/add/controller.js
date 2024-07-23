import { add_menu_category } from "../../dish/category/add/controller";
import { add_dish } from "../../dish/management/add/controller";
import { fetch_section } from "../../sections/management/fetch/controller";
import { add_menu } from "../management/add/controller";

export async function add_menu_dish(data) {

	try {

		// Dish Category
		const hotel_id = data['hotel_id'];
		const category_name = data['category_name'];

		// Dish
		const dish_name = data['dish_name'];
		const dish_code = data['dish_code'];
		const dish_type = data['dish_type'];

		// Menu
		const section_id = data['section_id'];
		const price = data['price'];

		// Default Invalid Checker
		if (section_id === undefined || section_id === null || section_id === "" ||
			price === undefined || price === null || price === "" ||
			hotel_id === undefined || hotel_id === null || hotel_id === "" ||
			category_name === undefined || category_name === null || category_name === "" ||
			dish_name === undefined || dish_name === null || dish_name === "" ||
			dish_code === undefined || dish_code === null || dish_code === "" ||
			dish_type === undefined || dish_type === null || dish_type === "") {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			};
		}

		// Fetch all sections
		const sections_result = await fetch_section({ data: { hotel_id } });
		if (sections_result.returncode !== 200 || sections_result.output.length === 0) {
			return {
				returncode: 500,
				message: "Add Sections First",
				output: []
			};
		}

		const sections = sections_result.output;

		// Inserting the Dish Category
		const category_result = await add_menu_category({ data: { hotel_id, category_name } });
		if (category_result.returncode !== 200 || category_result.output.length === 0) {
			return category_result;
		}

		const category_id = category_result.output[0].id;

		// Inserting the Dish
		const dish_result = await add_dish({ data: { hotel_id, dish_name, dish_code, dish_type, category_id } });
		if (dish_result.returncode !== 200 || dish_result.output.length === 0) {
			return dish_result;
		}

		const dish_id = dish_result.output[0].id;

		// Inserting the Menu for each section
		for (const section of sections) {
			const menu_result = await add_menu({ data: { dish_id, section_id: section.id, price } });

			if (menu_result.returncode !== 200 || !menu_result.output.length) {
				return menu_result;
			}
		}

		return {
			returncode: 200,
			message: "Menu Added",
			output: [{ success: true }]
		};

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
