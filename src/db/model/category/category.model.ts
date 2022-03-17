import { prop, getModelForClass, modelOptions, Index, types, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Types } from 'mongoose'

@modelOptions({
  schemaOptions: {
    collection: CollectionNames.CATEGORIES
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


export class Category extends BaseModel {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public image: string;

  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.CATEGORIES
  })
  parentId: Ref<Category>;

  @prop({ default: false })
  isParent: boolean

  @prop({ default: false })
  isTop: boolean

}


export const CategoryModel = getModelForClass(Category);