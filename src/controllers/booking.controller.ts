import { NextFunction, Response } from "express";
import { BookingService } from "../services";
import { ProtectedRequest } from "../types";
import { STATUS_CODES } from "../exceptions";

export default class BookingController {
  service: BookingService;

  constructor() {
    this.service = new BookingService();
  }

  // getAll = async (
  //   req: ProtectedRequest,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response> => {
  //   try {
  //     const data = await this.service.getAllBookings(req.query);
  //     return res.status(STATUS_CODES.OK).json({ status: "success", data });
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  getBookingById = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = await this.service.getBookingById(req.params.id);
      return res.status(STATUS_CODES.OK).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  };

  createBooking = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = await this.service.createBooking({ userId: req.user.id, ...req.body });
      return res.status(STATUS_CODES.CREATED).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  };

  updateBooking = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = await this.service.updateBooking(req.params.id, req.body);
      return res.status(STATUS_CODES.OK).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  };

  deleteBooking = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = await this.service.deleteBooking(req.params.id);
      return res.status(STATUS_CODES.OK).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  };
}

