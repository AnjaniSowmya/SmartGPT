const { spawn } = require('child_process')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const params = req.query.question + " " + req.query.rel_name;
    const childPython = spawn('py', ['SmartGPTProcess.py', req.query.question, req.query.rel_name]);
    let response = '';
    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        response += data;
    });
    childPython.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
    childPython.on('close', (code) => {
        console.log(`child process exited with code: ${code}`);
        res.send(response);
    })
  //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})