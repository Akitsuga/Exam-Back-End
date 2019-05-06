const router = require('express').Router() 
const conn = require('../connection/connection')

const express = require('express')
router.use(express.static('files'))


// Add Connection
router.post('/connection/add', (req,res) => {
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