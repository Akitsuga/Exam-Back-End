const bcrypt = require('bcrypt')
const router = require('express').Router() //method app diganti ke router
const isEmail = require('validator/lib/isEmail')
// const multer = require('multer')
const conn = require('../connection/connection')

const express = require('express')
router.use(express.static('files'))

// Login 
router.post('/users/login', async (req, res) => {
    const {email, cellphone, password} = req.body
    const sql = `SELECT * FROM users 
    WHERE email = '${email}'`
    
    if(!isEmail(req.body.email)) return res.send("Email not valid")
    req.body.password = await bcrypt.hash(req.body.password, 8)

    conn.query(sql, async (err, result) => {
        if (err) return res.send(err.message) 
        if(!result[0]) return res.send ("account not found")        
        
        const hash = await bcrypt.compare(password, result[0].password)
        
        if(!hash) return res.send ("Email & password not match")
        
        res.send(result)
    })
})

// Check user all users data, kec: password
router.get('/checkallusers', (req, res) => {
    const sql = `SELECT email, cellphone, first_name, middle_name, last_name, address, city FROM users u JOIN biodatas b ON u.id = b.id`
    conn.query(sql, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
})

// Check current user data
router.post('/checkuser', (req, res) => {
    const {email} = req.body, {cellphone} = req.body
    const sql = `SELECT email, cellphone, first_name, middle_name, last_name, address, city 
    FROM users u JOIN biodatas b ON u.id = b.id 
    WHERE email = '${email}' OR cellphone = ${cellphone}`

    conn.query(sql, (err, result) => {
        if (err) return res.send(err.message) // Error pada query SQL
        const user = result[0] // result berupa array of object
        if (!user) return res.send("User Not Found")
        res.send(user) 
    })
})

// Add User
router.post('/reg', async (req, res) => {
    var data = req.body
    var sql = `INSERT INTO users SET ?`
    if(!data.email || !isEmail(data.email)) return res.send("Email not valid")
    data.password = await bcrypt.hash(req.body.password, 8)
    conn.query(sql, data, (err,result) => {
        if (err) return res.send(err.sqlMessage)        
        res.send(result)
    })

})

// Change user email (on Progress)
router.put('/user/change/:email', (req, res) => {
    const data = [req.body, req.params.email]
    const sql = `SELECT '?' , '?'`
    if(!isEmail(req.body.email)) return res.send("Email not valid")
    if(!isEmail(req.params.email)) return res.send("Email not valid")
    console.log(req.body);
    console.log(req.params.email);
    
    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.sqlMessage)
        res.send(result)
    })
})

// Edit user biodata (on Progress)
router.post('/editbiodata/:id', async (req, res) => { 
    const{id} = req.params
    // if(req.body.password){
    //      req.body.password = await bcrypt.hash(req.body.password, 8)
    // }
    const data = req.body
        var sql = `UPDATE biodatas SET ? WHERE id=${id};`
        var sql2 = `SELECT * FROM users WHERE id=${id};`
        // var sql2 = `UPDATE users SET avatar = '${req.file.filename}' WHERE id=${user_id};`
        conn.query(sql, data, (err, result) => {
            if(err) return res.send('Error1')

                conn.query(sql2, data, (err, result) => {
                    if(err) return res.send(err)

                    return res.send(result)
                })
        
                
            // return res.send(result)
       })


})


// Delete user
router.delete('/user', (req, res) => {
    const data = req.body.email
    const sql = `DELETE FROM users WHERE email = ?`
    
    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.message)
        res.send("User deleted")
    })
})


// Check all product
router.get('/checkallproducts', (req, res) => {
    const sql = `SELECT * FROM products`
    conn.query(sql, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
})

// Check spesifik produk by name
router.post('/checkproduct', (req, res) => {
    const {productName} = req.body
    const sql = `SELECT * FROM products 
    WHERE productName = '${productName}' 
    OR productName LIKE '%${productName}'
    OR productName LIKE '${productName}%'`

    conn.query(sql, (err, result) => {
        if (err) return res.send(err.message)
        const user = result 
        if (!user) return res.send("Product Not Found")
        res.send(user) 
    })
})

// Add produk
router.post('/product', (req, res) => {
    var data = req.body
    var sql = `INSERT INTO products SET ?`
    var sql2 = `SELECT * FROM products WHERE productName = ?;`
    
    if(!data.productName) return res.send("productName tidak boleh kosong")
    if(!data.productPrice) return res.send("productPrice tidak boleh kosong")

    conn.query(sql, data, (err, result) => { 
        if (err) return res.send(err.sqlMessage) // Error pada post data

        conn.query(sql2, data.productName, (err, result) => {
            if (err) return res.send(err); res.send(result) // Error pada select data
       })
    })
})

// Delete produk by EXACT name
router.delete('/product', (req, res) => {
    const data = req.body.productName
    const sql = `DELETE FROM products WHERE productName = ?`

    conn.query(sql, data, (err, result) => {
        if (err) return res.send(err.message)
        res.send("Data deleted")
    })
})



module.exports = router