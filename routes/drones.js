const express = require('express');
const router = express.Router();
const Drones = require('../models/Drone.model')

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drones.find()
  .then((allDrones) => {
    console.log(allDrones)
    res.render('drones/list', { drones: allDrones})
  })
  .catch((err)=> {
    next(err)
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form.hbs');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body;

  Drones.create({name, propellers, maxSpeed })
  .then((createdDrone) => {
    console.log('Drone created', createdDrone.name);
    res.redirect('/drones')
  })
  .catch((err) => next(err));

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params;
  Drones.findById(id)
  .then((foundDrone) => {
  res.render('drones/update-form.hbs', {drone: foundDrone});

  })
  .catch((err) => {
    next(err);
  });

});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {id} = req.params;
  const{name, propellers, maxSpeed} = req.body;

  Drones.findByIdAndUpdate(id, {name, propellers, maxSpeed})
  .then((updatedDrone) => {
    res.redirect(`/drones/${updatedDrone._id}`);

  })
  .catch((err) => {
    next(err);
  });
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const {id} = req.params;
  Drones.findByIdAndDelete(id)
  .then(() => {
    res.redirect(`/drones`);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
