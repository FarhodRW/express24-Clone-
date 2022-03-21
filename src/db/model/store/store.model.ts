import { prop, getModelForClass, modelOptions, Index, types, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Types } from 'mongoose'
import { Category } from "../category/category.model";

@modelOptions({
  schemaOptions: {
    collection: CollectionNames.STORES
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

@Index({
  branchId: 1,
},
  {
    name: 'branchId',
    unique: true,
    background: true
  })

class Location {
  @prop({ type: () => String })
  public langtd: string;

  @prop({ type: () => String })
  public longtd: string;

}
class DeliveryPrice {
  @prop({ type: () => Number })
  public min: number;

  @prop({ type: () => Number })
  public max: number;

}

class WorkingTime {
  @prop({ type: () => String })
  public start: string;

  @prop({ type: () => String })
  public end: string;

}

class DeliveryTimeRange {
  @prop({ type: () => String })
  public min: string;

  @prop({ type: () => String })
  public max: string;
}



export class Store extends BaseModel {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public image: string;

  @prop({ default: 0 })
  public branchId: number;

  @prop({ type: () => Location })
  public location: Location;

  @prop({ type: () => DeliveryPrice })
  public deliveryPrice: DeliveryPrice;

  @prop({ type: () => DeliveryTimeRange })
  public deliveryTimeRange: DeliveryTimeRange;

  @prop({ type: () => WorkingTime })
  public workingTime: WorkingTime;


  @prop({
    type: Types.ObjectId,
    ref: CollectionNames.CATEGORIES
  })
  categoryId: Ref<Category>;

  @prop({ type: String, default: [] })
  public tags: Types.Array<string>;
}



export const StoreModel = getModelForClass(Store);