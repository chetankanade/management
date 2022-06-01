import { Expose } from "class-transformer";
import { IsDefined, IsString } from "class-validator";

/**
 * email: "patelsachinsp269@gmail.com"
 * password: "sach123"
 */

export class LoginPayload {
  @Expose() @IsDefined() @IsString() email: string;

  @IsDefined() @IsString() password: string;
}
