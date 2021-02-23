const app = require('../index');
const syncDB = require('./sync-db');

// sequelize sync 는 내부적으로 비동기처리를 위해 promise 지원.
syncDB().then(_ => {
    console.log('Sync database!');
    app.listen(3000, () => {
        console.log('Server is running on 3000 port');
    })
})
