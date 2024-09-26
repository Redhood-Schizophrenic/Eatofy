import { update_compliance_status } from "@/db/crud/compliance/management/update";

export async function update_compliance(data) {
	try {

		const compliance_id = data['compliance_id'];
		const status = data['status'];

		// Default Invalid Checker
		if ( 
			compliance_id == null || status == null || 
			compliance_id == undefined || status == undefined || 
			compliance_id == "" || status == ""  
		) {
			return {
				returncode: 400,
				message: 'Invalid Input',
				output: []
			}

		}

		// Updating the Compliance Status
		const result = await update_compliance_status({
			compliance_id,
			status
		});

		return result;

	} catch (error) {
		return {
			returncode: 500,
			message: error.message,
			output: []
		};
	}
}
