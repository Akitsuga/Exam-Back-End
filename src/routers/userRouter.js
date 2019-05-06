const bcrypt = require('bcrypt')
const router = require('express').Router() 
const isEmail = require('validator/lib/isEmail')
const conn = require('../connection/connection')

const express = require('express')
router.use(express.static('files'))

// Show All Movies
router.get('/movies/show', (req, res) => {
    const sql = `SELECT * FROM movies`
    conn.query(sql, (err, result) => {
        if(err) return res.send("failed to show")
        res.send(result)
    })
})
// Add Movies
router.post('/movies/add', (req, res) => {
    const {nama, tahun, deskripsi} = req.body; data = req.body
    const sql = `INSERT INTO movies (nama, tahun, deskripsi) VALUE ('${nama}','${tahun}','${deskripsi}')`
    if(!data.nama||!data.tahun||!data.deskripsi) return res.send("nama, tahun, deskripsi tidak boleh kosong")
    
    conn.query(sql, data, (err,result) => {
        if(err) return res.send("failed to send")
        res.send(result)
    })
})
// Edit Movies
router.put('/movies/edit/:id', (req, res) => {
    const data = [req.body, req.params.id]
    const {nama, tahun, deskripsi} = req.body
    const id = req.params.id
    const sql = `UPDATE movies SET nama = '${nama}', tahun = ${tahun}, deskripsi = '${deskripsi}' WHERE id = ${id}`
    
    conn.query(sql, data, (err, result) => {
        // console.log(sql);
        if (err) return res.send("gagal update")
        res.send(result)
    })
})

// Delete Movies
router.delete('/movies/delete/:id', (req,res) => {
    const data = req.params.id
    const sql = `DELETE FROM movies WHERE id = ?`
    
    conn.query(sql, data, (err, result) => {
        if(err) return res.send("gagal delete")
        res.send(result)
    })
})

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


// Add Connection
router.post('/connection', (req,res) => {
    const {movie_id, cat_id} = req.body; data = req.body
    const sql = `INSERT INTO movcat (movie_id, category_id) VALUE (${movie_id},${cat_id})`

    conn.query(sql, data, (err, result) => {
        if (err) return res.send("gagal berhubungan =_=;;")
        res.send(result)
    })
})
// Delete Connection
router.delete('/connection/delete/:id', (req,res) => {
    const data = req.params.id
    const sql = `DELETE FROM movcat WHERE id = ?`

    conn.query(sql, data, (err,result) => {
        if(err) return res.send("gagal putus")
        res.send(result)
    })
})



module.exports = router