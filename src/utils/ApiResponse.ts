import { Response } from 'express';

class ApiResponse {
  status: number;
  message: string;
  data: any;

  constructor(status: number, message: string, data: any = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success(data: any = null, message: string = 'Success'): ApiResponse {
    return new ApiResponse(200, message, data);
  }

  static error(message: string = 'Internal Server Error'): ApiResponse {
    return new ApiResponse(500, message);
  }

  send(res: Response): void {
    res.status(this.status).json({
      status: this.status,
      message: this.message,
      data: this.data,
    });
  }
}

export default ApiResponse;
