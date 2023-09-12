const express = require('express');
const router = express.Router();
const dbOperations = require('./db/db-operations');

router.get('/cops', async(req, res) => {
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);
    const nearestCops = await dbOperations.fetchNearestCops([longitude, latitude], 2000);

    res.json({
        cops: nearestCops
    });
});

