class ErrorBase extends Error {
  private status: number;

  constructor(message = 'Internal server error', status = 500) {
    super(message);
    this.message = message;
    this.status = status;
  }

  sendResponse(res: any) {
    res.status(this.status).send({
      message: this.message,
      status: this.status
    });
  }
}

export default ErrorBase;
