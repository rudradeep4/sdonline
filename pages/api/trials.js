// import nextConnect from 'next-connect';
// // import middleware from '../../middleware/database';

// const handler = nextConnect()

// handler.use(middleware)

// // handler.get(async (req, res) => {
// //     let doc = await req.db.collection('trials').find().toArray()
// //     res.json(doc)
// // })

// handler.post(async (req, res) => {
//     let data = req.body;
//     data = JSON.parse(data);
   
//     const filter = { video_path: data.trialId };
//     const updateDoc = {$push:
//         {responses: {
//             "subject": data.subject,
//             "age": data.age,
//             "sex": data.sex,
//             "order": data.order,
//             "trial_num": data.count,
//             "response": data.response
//         }}
//     };

//     let result = await req.db.collection('trials').updateOne(filter, updateDoc)
//     res.json({message: 'ok'});
// })

// export default handler

import { MongoClient } from "mongodb"

export default async function handler(req, res) {
    switch (req.method) {
        case 'POST': {
            return addResponse(req, res);
        }
    }
}

async function addResponse(req, res) {

    try {
        // connect to the database
        const client = await MongoClient.connect(process.env.MONGODB_URI)
        const db = client.db('Cluster0')

        // update with response
        const filter = { video_path: data.trialId };
        const updateDoc = {$push:
            {responses: {
                "subject": data.subject,
                "age": data.age,
                "sex": data.sex,
                "order": data.order,
                "trial_num": data.count,
                "response": data.response
            }}
        };

        await req.db.collection('trials').updateOne(filter, updateDoc)
        return res.json({
            message: 'ok'
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        })
    }
}