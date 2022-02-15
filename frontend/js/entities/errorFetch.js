export class ErrorFetch {
  /**
   * Create a JavaScript object with the message, status, and isError properties
   * @param message {string}  - The message to be displayed to the user.
   * @param status {integer} - The HTTP status code.
   * @param isError {boolean} - If true, the error is considered an error. If false, the error is a warning.
   */

  constructor(message = '', status = 0, isError = true) {
    this.message = message
    this.status = status
    this.isError = isError
  }
}
