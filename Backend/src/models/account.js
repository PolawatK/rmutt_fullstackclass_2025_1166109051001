const pool = require("../config/db");
const crypto = require("crypto");

module.exports = {
    async getAccount(){
        const result = await pool.query("select * from users")
        return result.rows;
    },

    async getById(id){
        const result = await pool.query("select * from users where id = $1", [id]);
        return result.rows[0];
    },

    async register(name, email, password, phone){
        const checkEmail = await pool.query('select * from users where email = $1', [email]);

        if (checkEmail.rows.length > 0){
            return null;
        }

        const passwordHash = crypto.createHash('md5').update(password).digest('hex');

        const result = await pool.query('insert into users (name, email, password_hash, phone, role_id) values ($1, $2, $3, $4, $5) returning *',
            [name, email, passwordHash, phone, 1]
        );

        return result.rows[0];
    },

    async login(email, password){
        var paswordHash = crypto.createHash('md5').update(password).digest('hex');
        
        const result = await pool.query('select * from users where email = $1 and password_hash = $2',[email, paswordHash]);

        if(result.rows.length > 0){
            return result.rows[0];
        } else {
            return null;
        }

    },
}