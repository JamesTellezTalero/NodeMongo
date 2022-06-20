const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    _id: Schema.Types.ObjectId,
    task_tittle: { type: String, required: true },
    task_desc: { type: String, required: true },
    task_state: { type: String, required: true },
    task_created_date: { type: String, required: true },
    task_completed_date: { type: String, required: true },
    project_id: { type: Schema.Types.ObjectId, refs: 'project' },
    sub_tasks: [{ type: Schema.Types.ObjectId, refs: 'subtask' }],
});

const TaskModel = mongoose.model('task', TaskSchema);
module.exports = TaskModel;