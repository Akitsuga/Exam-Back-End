const router = require('express').Router() 
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

    if(!data.nama||!data.tahun||!data.deskripsi) return res.send("nama, tahun, deskripsi tidak boleh kosong")

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


module.exports = router