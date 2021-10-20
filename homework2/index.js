const express = require('express');
const fs = require('fs');

const api = express();

api.use(express.json());

let students = [];

const read = (fileName) => {
  return new Promise((success, fail) => {
    fs.readFile(fileName, (err, data) => {
      if (err) return fail(err);
      return success(data);
    });
  });
};


const write = (fileName, data) => {
  return new Promise((success, fail) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};


api.post('/students', async (req, res) => {
  students = req.body;
  try {
    let studentsData = await read('students.json');
    let parsedStudents = JSON.parse(studentsData);
    parsedStudents.push(students);
    let jsonStudents = JSON.stringify(parsedStudents);
    write('students.json', jsonStudents);
    res.status(201).send(req.body);
  } catch (err) {
    console.log(err);
  };

});


api.get('/students', async (req, res) => {
  try {
    let studentsData = await read('students.json');
    let students = JSON.parse(studentsData);
    res.status(200).send(students);
  } catch (err) {
    console.log(err);
  };
});

api.get('/students/:id', async (req, res) => {
  try {
    let studentsData = await read('students.json');
    let students = JSON.parse(studentsData);
    if (!students[req.params.id]) {
      return res.status(404).send('Not found');
    }
    res.status(200).send(students[req.params.id]);
  } catch (err) {
    console.log(err);
  };
});

api.delete('/students/:id', async (req, res) => {
  try {
    let studentsData = await read('students.json');
    let students = JSON.parse(studentsData);
    // console.log(students);
    if (!students[req.params.id]) {
      return res.status(404).send('Not found');
    }
    students = students.filter((s, i) => i != req.params.id);
    let jsonStudents = JSON.stringify(students);
    await write('students.json', jsonStudents);
    res.status(204).send();
  } catch (err) {
    console.log(err);
  };
});

api.put('/students/:id', async (req, res) => {
  try {
    let studentsData = await read('students.json');
    let students = JSON.parse(studentsData);
    if (!students[req.params.id]) {
      return res.status(404).send('Not found');
    }
    const student = students.find(student => student.id === req.params.id);
    const index = req.params.id;
    students[index] = req.body;
    let jsonStudents = JSON.stringify(students);
    await write('students.json', jsonStudents);
    res.status(201).send(req.body);
  } catch (err) {
    console.log(err);
  };
});


api.patch('/students/:id', async (req, res) => {
  try {
    let studentsData = await read('students.json');
    let students = JSON.parse(studentsData);
    if (!students[req.params.id]) {
      return res.status(404).send('Not found');
    }
    const student = students.find((student, i) => i == req.params.id);
    if (req.body.first_name) {
      student.first_name = req.body.first_name;

    };
    if (req.body.last_name) {
      student.last_name = req.body.last_name;
    };
    const index = req.params.id;
    students[index] = student;

    let jsonStudents = JSON.stringify(students);
    await write('students.json', jsonStudents);
    res.status(201).send(req.body);
  } catch (err) {
    console.log(err);
  };
});


api.listen(3002, err => {
  if (err) {
    return console.log(err);
  }
  return console.log('Server successfully started on port 3002');
});