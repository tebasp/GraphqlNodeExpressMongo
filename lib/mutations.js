const { ObjectId } = require('mongodb')
const connectDb = require('./db')

const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    try {
      const defaults = {
        topic: '',
        description: '',
      }
      let newCourse = Object.assign(defaults, input)

      const db = await connectDb()
      const course = await db.collection('course').insertOne(newCourse) // course { insertedID: "Sasdfas-asdfasdf" }
      newCourse._id = course.insertedId // Debe devolver un curso incluido el ID
      return newCourse
    } catch (e) {
      errorHandler(e)
    }
  },

  editCourse: async (root, { id, input }) => {
    try {
      const db = await connectDb()
      await db
        .collection('course')
        .updateOne({ _id: ObjectId(id) }, { $set: input })

      const course = db.collection('course').findOne({ _id: ObjectId(id) })
      return course
    } catch (e) {
      errorHandler(e)
    }
  },

  deleteCourse: async (root, { id }) => {
    try {
      const db = await connectDb()
      await db.collection('course').deleteOne({ _id: ObjectId(id) })
      return true
    } catch (e) {
      errorHandler(e)
    }
  },

  createPerson: async (root, { input }) => {
    try {
      const db = await connectDb()
      const student = await db.collection('student').insertOne(input)
      console.log('Student', student)
      input._id = student.insertedId
      return input
    } catch (e) {
      errorHandler(e)
    }
  },

  // Add student to Course
  addPeople: async (root, { courseId, personId }) => {
    try {
      const db = await connectDb()
      // Validate if student or course exits
      const student = await db
        .collection('student')
        .findOne({ _id: ObjectId(personId) })
      const course = await db
        .collection('course')
        .findOne({ _id: ObjectId(courseId) })

      if (!student || !course) {
        throw new Error('Person or Course does not exits')
      }

      // Add Student Id to course
      await db.collection('course').updateOne(
        { _id: ObjectId(courseId) },
        { $addToSet: { people: ObjectId(personId) } } // $addToSet Verifies the people[]
      )

      return course
    } catch (e) {
      errorHandler(e)
    }
  },
}
