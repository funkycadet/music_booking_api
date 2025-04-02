import { db } from '../database';
import { NotFoundError } from '../exceptions';
import { IUser, IUserSignup, Pageable, Page } from '../interfaces';
import { pageableHandler } from '../utils';
import { Prisma } from '@prisma/client';

class UserService {
  public async getAllUsers(query: Pageable<Prisma.UserWhereInput>): Promise<Page<IUser>> {
    const pageableQuery = pageableHandler.process<Prisma.UserWhereInput>(query);

    const [count, data] = await Promise.all([
      db.user.count({ where: pageableQuery.filter }),
      db.user.findMany({
        skip: pageableQuery.skip,
        take: pageableQuery.limit,
        where: pageableQuery.filter,
        // include: {
        //   profile: true,
        // },
        orderBy: pageableQuery.orderBy || { createdAt: 'desc' },
      }),
    ]);

    return pageableHandler.responseToPageable(pageableQuery, count, data);
  }

  public async getUserById(id: string): Promise<IUser> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return user;
  }

  public async getUser(filter: Partial<IUser>): Promise<IUser> {
    const user = await db.user.findFirst({
      where: {
        ...filter,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return user;
  }

  public async createUser(data: IUserSignup): Promise<IUser> {
    return await db.user.create({
      data,
    });
  }

  public async updateUser(id: string, data: object): Promise<IUser> {
    return await db.user.update({
      where: {
        id,
      },
      data,
    });
  }

  public async deleteUser(id: string): Promise<IUser> {
    return await db.user.delete({
      where: {
        id,
      },
    });
  }

  public async addProfile(id: string, data: object): Promise<IUser> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return await db.user.update({
      where: {
        id,
      },
      data: {
        profile: {
          create: data,
        },
      },
    });
  }

  public async updateProfile(id: string, data: object): Promise<IUser> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found!');
    }

    return await db.user.update({
      where: {
        id,
      },
      data: {
        profile: {
          update: data,
        },
      },
    });
  }
}

export default UserService;
