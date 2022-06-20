const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubTaskSchema = new Schema({
    _id: Schema.Types.ObjectId,
    task_id: { type: Schema.Types.ObjectId, refs: "task" },
    sub_task_desc: { type: String, required: true },
    sub_task_state: { type: String, required: true },
});

const SubTaskModel = mongoose.model('subtask', SubTaskSchema);
module.exports = SubTaskModel;