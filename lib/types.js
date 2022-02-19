const { ObjectId } = require('mongodb')
const connectDb = require('./db')

const errorHandler = require('./errorHandler')

module.exports = {
  Course: {
    people: async ({ people }) => {
      // { people } El campo de la Tabla en la DB
      try {
        let peopleData

        const db = await connectDb()
        ids = people ? people.map((id) => ObjectId(id)) : [] // Returns ID´s as ID Objects

        if (ids.length > 0) {
          peopleData = await db
            .collection('student')
            .find({ _id: { $in: ids } })
            .toArray()
        } else {
          peopleData = []
        }

        return peopleData
      } catch (e) {
        errorHandler(e)
      }
    },
  },

  Person: {
    __resolveType: (person, ctx, info) => {
      if (person.phone) {
        return 'Monitor'
      }
      return 'Student'
    },
  },

  GlobalSearch: {
    __resolveType: (item, ctx, info) => {
      if (item.title) return 'Course'
      if (item.phone) return 'Monitor'
      return 'Student'
    },
  },
}
