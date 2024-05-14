import OpenAI from 'openai';
import express, {request} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  organization: 'org-zvQgdrUrI0wqfaS1bmDWyVdf',
  apiKey:process.env.OPENAI_API_KEY,
});

app.post('/', async (request, response) => {
  const { chats } = request.body;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'Eres un asistente para escribir código de programación',
      },
      ...chats,
    ],
    model: 'gpt-3.5-turbo',
  });

  response.json({
    output: completion.choices[0].message,
  });
});





app.listen(8080,() => console.log('Tomando el puerto http://localhost:8080'));