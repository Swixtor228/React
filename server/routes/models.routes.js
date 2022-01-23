module.exports = (app, pareser) => {
    const models = {
        user:{},
    }
    Object.keys(models).map((model) => {
        const router = require('express').Router();
        const controller = require('../controllers/' + model + '.controller.js')
        if (model === 'user') {
            router.get('/',controller.getAll)
            router.post('/',controller.create)
            router.delete('/:id',controller.delete)
        }
    })
}