const { ObjectId } = require('mongodb')
const connectDb = require('./db')

const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    let db
    let courses = []

    try {
      db = await connectDb()
      courses = await db.collection('course').find().toArray()
      return courses
    } catch (e) {
      errorHandler(e)
    }
  },

  getCourse: async (root, { id }) => {
    try {
      let db, course

      db = await connectDb()
      course = await db.collection('course').findOne({ _id: ObjectId(id) })
      return course
    } catch (e) {
      errorHandler(e)
    }
  },

  getPeople: async (root, args) => {
    try {
      const db = await connectDb()
      const students = await db.collection('student').find().toArray()
      return students
    } catch (e) {
      errorHandler(e)
    }
  },

  getPerson: async (root, { id }) => {
    try {
      const db = await connectDb()
      const student = await db
        .collection('student')
        .findOne({ _id: ObjectId(id) })
      return student
    } catch (e) {
      errorHandler(e)
    }
  },

  globalSearch: async (root, { keyword }) => {
    try {
      const db = await connectDb()

      const courses = await db
        .collection('course')
        .find({ $text: { $search: keyword } })
        .toArray()

      const people = await db
        .collection('student')
        .find({ $text: { $search: keyword } })
        .toArray()

      return [...courses, ...people]
    } catch (e) {
      // errorHandler(e)
      console.log('Error global search', e)
    }
  },
}
