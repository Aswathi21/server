const express = require('express');
const cors = require('cors');
const axios = require('axios')
const app = express();

app.use(cors());

var data = []

async function fetchExternalApiPage(page_no = 1){
    const url = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page_no}`;
    const response = await axios.get(url);
    for(let i=0; i< response.data.nodes.length; i++ ){
        data.push(response.data.nodes[i].node);
    }
    return data;
}

app.get('/:page', async(req,res) => {
    const {page} = req.params;
    const fetched_result = await fetchExternalApiPage(page);
    console.log(fetched_result)
    res.send(fetched_result)
})

const port = 5000;

app.listen(port, () => console.log(`app started at port ${port}`))