import * as jwt from "jsonwebtoken";

export const jwtWebToken = function (id: any): string {
  const token = jwt.sign({ id }, process.env.SECRATE_KEY, {
    expiresIn: "1h",
  });

  return token;
};
