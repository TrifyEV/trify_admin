export interface IApiException {
  message: string
  statusCode: number
  response?: any
}

class ApiException implements IApiException {
  message: string
  statusCode: number
  response?: any

  constructor(message: string, statusCode: number, response?: any) {
    this.message = message
    this.statusCode = statusCode
    this.response = response
  }
}
export default ApiException
