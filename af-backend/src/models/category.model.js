import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
    },
    categoryImage: {
        type: String,
    },
    categoryDescription: {
        type: String,
    },
    categoryStatus: {
        type: String,
    },
    categoryID: {
        type: String,
    },

});

const Category = mongoose.model("Category", categorySchema);

export default Category;