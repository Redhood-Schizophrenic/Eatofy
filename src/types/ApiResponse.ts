export interface ApiResponse {
	returncode: number,
	message: string,
	output: Array<Object> | Array<void>
} 
