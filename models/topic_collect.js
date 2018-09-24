var mongoose = require("mongoose");
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;
var ObjId = Schema.ObjectId;
console.log("obj id", ObjId);

var topicCollectSchema = new Schema({
  user_id: { type: ObjId },
  topic_id: { type: ObjId },
  create_at: { type: Date, default: Date.now }
});

topicCollectSchema.plugin(BaseModel);
topicCollectSchema.index({ user_id: 1, topic_id: 1 }, { unique: true });

mongoose.model("TopicCollect", topicCollectSchema);
