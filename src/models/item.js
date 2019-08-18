import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: String,
  container: String
});

const Item = mongoose.model("Item", ItemSchema);

export default Item;
