import { Schema, model, Types } from 'mongoose';

  interface IBusiness {
    _id: Types.ObjectId,
    name: string;
    active: boolean;
  }

  const schema = new Schema<IBusiness>({
    name: { type: String, required: true, unique : true },
    active: { type: Boolean, required: true },
  });

  const Business = model<IBusiness>('Business', schema);
  export default Business;