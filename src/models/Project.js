const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    _id: Schema.Types.ObjectId,
    project_tittle: { type: String, required: true },
    project_desc: { type: String, required: true },
    project_color: { type: String, required: true }
});

const ProjectModel = mongoose.model('project', ProjectSchema);
module.exports = ProjectModel;