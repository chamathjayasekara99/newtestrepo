import Admin from '../models/admin.model'
import logger from '../utils/logger'

export const createAdmin = async (admin) => {
  const adminMade = (await new Admin(admin).save()).toObject()
  return adminMade
}

export const getAllAdmins = async ({ sort = {}, filter = {}, page}) => {
  const options = {
    page,
    collation: {
      locale: 'en'
    }
  }

  if (Object.keys(sort).length > 0) options.sort = sort


  const aggregateQuery = () =>
    Admin.aggregate([
      {
        $match: filter
      },
      { $unset: ['password', 'verification_code'] }
    ])

  return await (page ? Admin.aggregatePaginate(aggregateQuery(), options) : aggregateQuery()).catch((err) => {
    logger.error(`An error occurred when retrieving admins - err: ${err.message}`)
    throw err
  })
}

export const getOneAdmin = async (filters, returnPassword = false) => {
  const admin = await Admin.findOne(filters).lean()
  if (!admin) return null

  if (!returnPassword) delete admin.password
  return admin
}

export const findOneAndUpdateAdmin = async (filters, data) => {
  const admin = await Admin.findOneAndUpdate(filters, data, { new: true }).lean()
  if (!admin) return null

  delete admin.password
  return admin
}

export const findOneAndRemoveAdmin = async (filters) => {
  return await Admin.findOneAndRemove(filters)
}