const express = require ('express')

const app = express()

app.use(express.json())

kidneys = []

app.get('/', (req, res) => {

    const healthy_kidney_count = kidneys.reduce((healthy_kidney_count, kidneys) => {
        return kidneys.is_healthy ? healthy_kidney_count + 1 : healthy_kidney_count;
    }, 0);
    
    const number_of_kidneys = kidneys.length;
    
    const unhealthy_kidney_count = number_of_kidneys - healthy_kidney_count;

    res
        .status(200)
        .json({
            number_of_kidneys: number_of_kidneys,
            healthy_kidney_count: healthy_kidney_count,
            unhealthy_kidney_count: unhealthy_kidney_count
    });
});

app.post('/', (req, res) => {
    const new_raw_kidney = req.body;

    const new_refined_kidney = {
        ...new_raw_kidney,
        kidney_index: kidneys.length + 1  
    };

    kidneys.push (new_refined_kidney);

    res
        .status(201)
        .json(new_refined_kidney);
});

app.put('/:kidney_id', (req, res) => {
    const kidney_index = req.params.kidney_id;

    let required_kidney_found = false;
    let required_kidney = {};
    
    kidneys.forEach((kidney, index, kidneys) => {
        if (kidney.kidney_index == kidney_index)
        {
            kidney.is_healthy = true;

            required_kidney = kidney;
            required_kidney_found = true;
        }
    });

    console.log (kidneys);

    if (required_kidney_found)
    {
        res
            .status(200)
            .json (required_kidney)
    }
    else
    {
        res
            .status(204)
            .json ({})
    }
});

app.delete('/:kidney_id', (req, res) => {
    const kidney_id = parseInt(req.params.kidney_id);

    const new_kidneys = kidneys.filter(kidney => kidney.kidney_index != kidney_id);

    if (new_kidneys.length == kidneys.length)
    {
        res
            .status(404)
            .json({"verdict": "kidney with given kidney_id NOT found!"});
    }
    else
    {
        kidneys = new_kidneys;

        res
            .status(200)
            .json({"verdict": "kidney removed successfully!"});
    }
});

app.listen(3000, () => {
    console.log('listening @ 3000')
});