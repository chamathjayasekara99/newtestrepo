import Admin from '../models/admin.model'
import logger from '../utils/logger'

export const createAdmin = async (admin) => {
  const adminMade = (await new Admin(admin).save()).toObject()
  return adminMade
}

export const getAllAdmins = async ({ sort = {}, filter = {}, page}) => {

}

export const getOneAdmin = async (filters, returnPassword = false) => {

}

export const findOneAndUpdateAdmin = async (filters, data) => {

}

export const findOneAndRemoveAdmin = async (filters) => {
 
}