import { send, json } from 'micro'
import { router, get, post, put, del, } from 'microrouter'
const cors = require('micro-cors')()

import Legos from './db/legos'

export default cors(router(
  get('/', async (req, res) => {
    const results = await Legos.find({})
    await send(res, 200, results)
  }),
  post('/', async (req, res) => {
    console.log(`I'm called`)

    // throw Error('Blah')
    const figure = await json(req)
    const result = await Legos.insert(figure)
    return send(res, 201, result)
  }),
  // get('/:id', async (req, res) => send(res, 200, {})),
  get('/:id', async (req, res) => {
    const _id = req.params.id
    const lego = await Legos.findOne({ _id })

    if(!lego) {
      return send(res, 404, { message: `Figure not found ${_id}`})
    }
    return send(res, 200, lego)
  }),
  put('/:id', async (req, res) => send(res, 200, {})),
  del('/:id', async (req, res) => {
    const id = req.params.id
    return send(res, 200, {})
  }),
  get('/*', (req, res) => send(res, 404, 'Not found route')),
))
