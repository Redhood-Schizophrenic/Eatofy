export interface ApiResponse {
	returncode: number,
	message: string,
	output: Array<Object> | Array<any> | Array<void>
} 
