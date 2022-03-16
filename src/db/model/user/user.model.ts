import { prop, getModelForClass, modelOptions, Index, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";




@modelOptions({
  schemaOptions: {
    collection: CollectionNames.USERS
  }
})
@Index(
  {
    email: 1
  }, {
  name: 'email',
  unique: true,
  background: true,
  partialFilterExpression: {
    isDeleted: false
  }
}
)

export class User extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: false })
  public isAdmin: boolean = false;

  @prop({ default: false })
  public isSuperAdmin: boolean = false;

  @prop({ default: 0 })
  public balance: number;

  @prop({})
  public image: string;
}

export const UserModel = getModelForClass(User);