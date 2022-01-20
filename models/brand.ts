import { Schema, model, Types } from 'mongoose';

  interface IBrand {
    _id: Types.ObjectId,
    name: string;
    code: string;
    active: boolean;
    business: Types.ObjectId
  }

  const schema = new Schema<IBrand>({
    name: { type: String, required: true, unique : true },
    active: { type: Boolean, required: true },
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business'
    }
  });

  const Brand = model<IBrand>('Brand', schema);
  export default Brand;