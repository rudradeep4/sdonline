import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req, res) => {
    let data = req.body;
    data = JSON.parse(data);
   
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

    let result = await req.db.collection('trials_sansNods').updateOne(filter, updateDoc)
    res.json({message: 'ok'});
})

export default handler