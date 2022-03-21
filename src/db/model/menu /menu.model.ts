import { prop, getModelForClass, modelOptions, Index, types, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Types } from 'mongoose'
import { Store } from "../store/store.model";

@modelOptions({
  schemaOptions: {
    collection: CollectionNames.MENUS
  }
})
@Index({
  title: 1
}, {
  name: 'title',
  unique: true,
  background: true,
  partialFilterExpression: {
    isDeleted: false
  }
})


export class Menu extends BaseModel {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public image: string;

  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.STORES
  })
  storeId: Ref<Store>;

  //here should be block id
}


export const MenuModel = getModelForClass(Menu);