class SqlDB{

    constructor(path){
        this.Sequelize = require('sequelize');
        this.path=path;
    }

    getDbConnect(){
        this.sequelize = new this.Sequelize(this.path);
        return this.sequelize;
    }
}
module.exports=SqlDB;