import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';
import { BadRequestError, STATUS_CODES, UnauthorizedError } from '../exceptions';
import { ProtectedRequest } from '../types';

class UserController {
  service: UserService;

  constructor() {
    this.service = new UserService();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const users = await this.service.getAllUsers(req.query);
      return res.status(STATUS_CODES.OK).json({ status: 'success', data: users });
    } catch (err) {
      next(err);
    }
  };

  getMe = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const foundUser = await this.service.getUserById(req.user.id);
      return res.status(STATUS_CODES.OK).json({ status: 'success', data: foundUser });
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const id = req.params.id;
      if (!id) throw new BadRequestError(`No id provided`);

      const user = await this.service.getUserById(id);

      return res.status(200).json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  };

  getUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.service.getUser(req.query);
      return res.status(STATUS_CODES.OK).json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const user = await this.service.updateUser(req.user.id, req.body);
      return res.status(STATUS_CODES.OK).json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const user = await this.service.deleteUser(req.params.id);
      return res.status(200).json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  };

  addProfile = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const user = await this.service.addProfile(req.user.id, req.body);
      return res.status(STATUS_CODES.CREATED).json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  };

  updateProfile = async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const user = await this.service.updateProfile(req.user.id, req.body);
      return res.status(STATUS_CODES.OK).json({ status: 'success', data: user });
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
