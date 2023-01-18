import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
    trim: true, // remove unnecessary white spaces
  },
  userProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  due_date: {
    type: String,
    default: 'YY-MM-DD',
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  guestList: {
    type: Array,
    guestName: String,
    phone: Number,
    default: null,
  },
  themeProjectList: {
    type: Array,
    themesName: String,
    default: null,
  },
  decorationsProjectList: {
    type: Array,
    decorationsName: String,
    default: null,
  },
  foodProjectList: {
    type: Array,
    foodName: String,
    default: null,
  },
  drinksProjectList: {
    type: Array,
    drinksName: String,
    default: null,
  },
  activitiesProjectList: {
    type: Array,
    activitiesName: String,
    default: null,
  },
  budgetList: {
    type: Array,
    itemName: String,
    default: null,
  },
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project
