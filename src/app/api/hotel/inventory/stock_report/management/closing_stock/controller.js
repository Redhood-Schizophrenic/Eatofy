import { read_available_stock } from "@/db/crud/inventory/available_stock/read";
import { create_available_stock_report } from "../../../../../../../db/crud/inventory/stock_report/create";
import { check_available_stock_report } from "../../../../../../../db/crud/inventory/stock_report/read";

const add_multiple_stock = async (data, hotel_id, date) => {
    let error_occured = false;

    // Use Promise.all to handle all asynchronous operations concurrently
    const results = await Promise.all(data.map(async (item) => {
        const item_id = item.ItemId;
        const quantity = item.Quantity;
        const unit = item.Unit;

        // Inserting the Available Stock
        try {
            const result = await create_available_stock_report({
                item_id,
                quantity,
                unit,
                hotel_id,
                date
            });

            if (result.returncode != 200) {
                error_occured = true;
                console.error(`Error adding stock for item ${item_id}: ${result.message}`);
            }

            return result;
        } catch (error) {
            error_occured = true;
            console.error(`Exception adding stock for item ${item_id}: ${error.message}`);
            return { returncode: 500, message: error.message };
        }
    }));

    if (error_occured) {
        return {
            returncode: 500,
            message: "Some Closing Stock could not be added.",
            output: results
        };
    } else {
        return {
            returncode: 200,
            message: "Closing Stock added.",
            output: results
        };
    }
}

export const add_closing_inventory = async (data) => {
    try {
        const date = data['date'] || null;
        const hotel_id = data['hotel_id'] || null;

        // Default Invalid Checker
        if (date == null) {
            return {
                returncode: 400,
                message: 'Invalid Input',
                output: []
            };
        }

        const available_stock = await read_available_stock({ hotel_id });
        const check = await check_available_stock_report({
            hotel_id,
            date
        });

        if (check.output.length == 0) {
            // Pass hotel_id and date to add_multiple_stock
            const result = await add_multiple_stock(available_stock.output, hotel_id, date);
            return result;
        } else {
            return {
                returncode: 500,
                message: "Internal Server Error, Please try again later.",
                output: []
            };
        }
    } catch (error) {
        return {
            returncode: 500,
            message: error.message,
            output: []
        };
    }
}
