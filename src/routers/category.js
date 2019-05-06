const router = require('express').Router() 
const conn = require('../connection/connection')

const express = require('express')
router.use(express.static('files'))

// Show All Categories
router.get('/categories/show', (req, res) => {
    const sql = `SELECT * FROM categories`
    conn.query(sql, (err, result) => {
        if(err) return res.send("failer to show categories")
        res.send(result)
    })
})
// Add Categories
router.post('/categories/add', (req, res) => {
    const {nama} = req.body;
    const sql = `INSERT INTO categories (nama) VALUE ('${nama}')`
    
    if(!req.body.nama) return res.send("nama tidak boleh kosong")

    conn.query(sql, data, (err,result) => {
        if(err) return res.send("failed to send")
        res.send(result)
    })
})
// Edit Categories
router.put('/categories/edit/:id', (req, res) => {
    const data = [req.body, req.params.id];
    const {nama} = req.body
    const id = req.params.id
    const sql = `UPDATE categories SET nama = '${nama}' WHERE id = ${id}`
    
    if(!req.body.nama) return res.send("nama tidak boleh kosong")

    conn.query(sql, data, (err, result) => {
        console.log(sql);
        if (err) return res.send("gagal update")
        res.send(result)
    })
})

// Delete Categories
router.delete('/categories/delete/:id', (req,res) => {
    const data = req.params.id
    const sql = `DELETE FROM categories WHERE id = ?`
    
    conn.query(sql, data, (err, result) => {
        if(err) return res.send("gagal delete")
        res.send(result)
    })
})



module.exports = router