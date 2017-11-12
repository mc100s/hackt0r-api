const mongoose = require("mongoose");
const { Schema } = mongoose;

const knowledgeScoreSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  actor: { 
    type: Schema.Types.ObjectId, 
    ref: 'Actor', 
    required: true
  },
  value: {
    type: Number,
    default: 0.5
  }
});

knowledgeScoreSchema.index({user: 1, actor: 1}, {unique: true});

module.exports = mongoose.model("KnowledgeScore", knowledgeScoreSchema);