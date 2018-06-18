const { send, json } = require('micro')
const { router, get, post } = require('microrouter')

let legos = [
  { name: "President Business", price: 9.99, isActive: true}
]

module.exports = router(
  get('/', async (req, res) => await send(res, 200, legos)),
  post('/', async (req, res) => {
    // throw Error('Blah')
    const figure = await json(req)
    legos = [...legos, figure]
    return send(res, 201, figure)
  }),
  get('/*', (req, res) => send(res, 404, 'Not found route'))
)
