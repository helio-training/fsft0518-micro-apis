import { send, json } from 'micro'
import { router, get, post, put, del, } from 'microrouter'

import Legos from './db/legos'

export default router(
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
  get('/:id', async (req, res) => send(res, 200, {})),
  put('/:id', async (req, res) => send(res, 200, {})),
  del('/:id', async (req, res) => {
    const id = req.params.id
    return send(res, 200, {})
  }),
  get('/*', (req, res) => send(res, 404, 'Not found route')),
)
