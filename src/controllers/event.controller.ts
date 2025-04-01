import { Request, Response, NextFunction } from "express";
import { EventService } from "../services";
import { ProtectedRequest } from "../types";
import { STATUS_CODES } from "../exceptions";

export class EventController {
  service: EventService;

  constructor() {
    this.service = new EventService();
  }

  getAll = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = await this.service.getAllEvents(req.query);
      return res.status(STATUS_CODES.OK).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  }

  getEventById = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = await this.service.getEventById(req.params.id);
      return res.status(STATUS_CODES.OK).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  }

  createEvent = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = await this.service.createEvent({ artistId: req.user.id, ...req.body });
      return res.status(STATUS_CODES.CREATED).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  }

  updateEvent = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const data = await this.service.updateEvent(req.params.id, req.body);
      return res.status(STATUS_CODES.OK).json({ status: "success", data });
    } catch (err) {
      next(err);
    }
  }

  deleteEvent = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      await this.service.deleteEvent(req.params.id);
      return res.status(STATUS_CODES.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }
}

