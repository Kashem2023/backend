const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
    selectedFile: {
        type: Array,
        required: [false, "Please Enter Product image"],
    },
})

const Logo = mongoose.model('logo', logoSchema)

exports.AddLogo = async (req, res) => {

    const { selectedFile, id } = req.body

    if (id) {
        const Mupdate = await Logo.findByIdAndUpdate(id, { selectedFile: selectedFile }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

        if (Mupdate) {
            res.status(201).json(
                {
                    success: true,
                    Mupdate
                }
            )
        }

    } else {
        const logo = await Logo.create({ selectedFile: selectedFile })

        if (logo) {
            res.status(201).json(
                {
                    success: true,
                    logo
                }
            )
        }

    }


}


exports.getLogo = async (req, res) => {
    const logo = await Logo.find()

    if (logo) {
        res.status(201).json(
            {
                success: true,
                logo
            }
        )
    }
}