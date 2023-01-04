const catchAsyncError = require('../middleware/asyncError')
const Method = require('../models/setMethodSchema')

exports.setMethod = catchAsyncError(async (req, res, next) => {
    const id = req.body.id
    const name = req.body.name

    if (id) {
       const Mupdate = await Method.findByIdAndUpdate(id, { name: name }, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

        if(Mupdate){
            res.status(201).json(
                {
                    success: true,
                    Mupdate
                }
            )
        }

    } else {
        const method = await Method.create({ name: name })

        if (method) {
            res.status(201).json(
                {
                    success: true,
                    method
                }
            )
        }

    }

})

exports.getMethod = catchAsyncError(async (req, res, next) => {
    const method = await Method.find()

    if (method) {
        res.status(201).json(
            {
                success: true,
                method
            }
        )
    }

})