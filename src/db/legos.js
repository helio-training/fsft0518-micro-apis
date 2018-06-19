import Datastore from 'nedb-promise'


const db = new Datastore({ filename: `${__dirname}/legos.db`, autoload: true })
export default db
