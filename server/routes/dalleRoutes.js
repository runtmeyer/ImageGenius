import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

router.route('/').get((req, res) =>{
    res.send('Hello from DALL.E');
}); 

router.route('/').post(async (req, res) =>{
  try{
    const { prompt } = req.body;

    // const aiResponse = openai.images.generate({ 
    //   prompt,
    //   n: 1,
    //   size: '1024x1024',
    //   response_format: 'b64_json',
    // });

    // const image = aiResponse.data; 

    async function main() {
      const image = await openai.images.generate({ prompt, n:1, size: '1024x1024', response_format: 'b64_json',});
    
      res.status(200).json({ photo: image.data[0].b64_json }); 
    }
    main();

    // console.log(image);
    // res.status(200).json({ photo: image });
  } catch(err){
    console.log(err);
    // res.status(500).send(err.response.data.error.message) 
  }
})



export default router; 