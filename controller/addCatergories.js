const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
    Cdata: {
        type: String,
        required: true
    },
})

const Categories = mongoose.model('categorie', CategoriesSchema)



exports.addCategories = async (req, res) => {
    const { data } = req.body

    if (data) {
        const categories = await Categories.create({ Cdata: data })

        if (categories) {
            res.status(201).json(
                {
                    success: true,
                    categories
                }
            )
        }
    }

}


exports.getCategories = async (req, res) => {
    const categories = await Categories.find()

    if (categories) {
        res.status(201).json(
            {
                success: true,
                categories
            }
        )
    }
}


exports.deleteCategories = async (req, res) => {

    let categories = await Categories.findById(req.body.id)


    if (!categories) {
        return res.status(500).json({
            success: false,
            message: "categories not found"
        })
    }

    await categories.remove()

    res.status(200).json(
        {
            success: true,
            message: "Categories deleted successfully"
        }
    )

}