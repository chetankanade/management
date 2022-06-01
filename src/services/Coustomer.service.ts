import { UpdateResult } from "typeorm";
import { Customer } from "../entity/Customer";
import IUser from "../interface/Request/IUser";
import { LoginPayload } from "../interface/Request/LoginPayload";
import { UserRequest } from "../interface/Request/UserRequest";
import { ICustomer } from "../interface/Responce/ICustomer";
import AppError from "../middleware/AppError";
import {
  addCustomer,
  getCustomer,
  getDetails,
  getTransection,
  updateCustomer,
} from "../repository/Customer.repository";
import { jwtWebToken } from "../utils/util";

export default class CoustomerService {
  // For Signup
  public async createCustomer(body: UserRequest): Promise<ICustomer> {
    let user = await addCustomer(body);

    user = await getCustomer(user.id);

    const token = jwtWebToken({ id: user.id });

    return { user, token };
  }

  // For Signin
  public async getCustomer(body: LoginPayload): Promise<ICustomer> {
    let user = await getCustomer({ email: body.email });

    if (!user) {
      throw new Error("User not Found");
    }

    await updateCustomer({ id: user.id }, { Update_At: new Date() });

    const token = jwtWebToken({ id: user.id });

    return { user, token };
  }

  public async getUserData(body: IUser): Promise<Customer> {
    let user = await getDetails(body.id);

    if (!user) throw new AppError(400, "User not Registered");

    return user;
  }

  public async checkTransection(
    body: IUser
  ): Promise<Array<Customer[] | number>> {
    let user = getTransection({ id: body.id });

    if (!user) throw new AppError(400, "User not Found");

    return user;
  }
}
