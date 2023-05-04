import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const AdminSchema = new mongoose.Schema(
  {
    emp_id : {
        type : String,
        required : [true , 'Employee id is required'],
        unique : [true , 'Employee id should be unique']
    },
    designation : {
        type : String ,
        enum: ['MANAGER', 'SUPERVISOR'],
        required : [true , 'Employee designation is required']
    }
  }
)

AdminSchema.plugin(aggregatePaginate)

const Admin = mongoose.model('Admin', AdminSchema)

export default Admin