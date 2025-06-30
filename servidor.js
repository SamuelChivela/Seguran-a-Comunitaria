const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();

const client = new twilio('SEU_SID', 'SEU_AUTH_TOKEN');
app.use(bodyParser.json());

app.post('/enviar-sms', (req, res) => {
  const { numero, mensagem } = req.body;

  client.messages.create({
    body: mensagem,
    to: numero,
    from: 'SEU_NUMERO_TWILIO'
  })
  .then(() => res.send({ status: 'ok' }))
  .catch(err => res.status(500).send({ erro: err.message }));
});

app.listen(3000, () => console.log("Servidor SMS ativo"));
