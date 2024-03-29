import { CollectionNames } from "../common/common.model";
import { Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user/user.model";
import { Types } from 'mongoose'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
@Index({
  isDeleted: 1
}, {
  name: 'isDeleted',
  background: true
})
@Index({
  createdBy: 1
}, {
  name: 'createdBy',
  background: true,
  partialFilterExpression: {
    isDeleted: false
  }
})
export class BaseModel {
  @prop({
    default: false
  })
  isDeleted?: boolean;

  @prop({ default: false })
  completelyDeleted?: false;

  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.USERS
  })
  createdBy?: Ref<User>;
}