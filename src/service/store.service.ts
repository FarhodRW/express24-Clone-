import { CommonService } from "./base.service";
import { Store, StoreModel } from '../db/model/store/store.model'
import { CollectionNames } from "../db/common/common.model";
import { Types, FilterQuery } from 'mongoose'

class StoreService<T> extends CommonService<T> {
}



export const storeService = new StoreService(StoreModel)