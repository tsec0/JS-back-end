const router = require("express").Router();

const { isAuthed } = require('../middlewares/authMiddleware');
const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");

const { getDifficultyOptionsViewData } = require('../utils/viewHelper');

router.get('/:cubeId/details', async (req, res) => {
  // .lean() can be added here -> it is a querry to be used for -> .lean() -> { materialize } to plain object
  const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();

  if(!cube){
    return res.redirect('/404');
  }

  // view data is passed trough the render function
  let isOwner = false;
  const hasOwner = typeof cube.owner?.toString() === "string";
  if(hasOwner){
    isOwner = cube.owner?.toString() === req.user?._id;
  }
  
  res.render('cube/details', { cube, isOwner });
});

// router.use(isAuthed); // not in that way (it bocomes a half middleware)

// URL -> Path /cubes/create
router.get("/create", isAuthed, (req, res) => {
  // console.log(req.user);
  res.render("cube/create");
});

router.post("/create", isAuthed, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  // res.send('Form submitted');
  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user._id,
  });

  res.redirect("/");
});

router.get('/:cubeId/attach-accessory', isAuthed, async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager.getOthers(cube.accessories).lean(); // those which are available
  const hasAccessories = accessories.length > 0;

  res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', isAuthed, async (req, res) => {
  const { accessory: accessoryId } = req.body;
  const cubeId = req.params.cubeId;

  await cubeManager.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', isAuthed, async (req, res) => {
  // give info in the page
  const cube = await cubeManager.getOne(req.params.cubeId).lean(); // this is a document -> turn it to objec

  // use view helper here for options
  const options = getDifficultyOptionsViewData(cube.difficultyLevel);

  // pass the cube and options to the view
  res.render('cube/delete', { cube, options });
});

router.post('/:cubeId/delete', isAuthed, async (req, res) => {
  // request to delete cube from DB
  await cubeManager.delete(req.params.cubeId);

  res.redirect('/');
});

router.get('/:cubeId/edit', isAuthed, async (req, res) => {
  // visualize data
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  // security features for not an authorised edit -> edit , delete, create, ... shgould be separate func
  if(cube.owner.toString() !== req.user?._id){
    return res.redirect('/404');
  }

  const options = getDifficultyOptionsViewData(cube.difficultyLevel);

  res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', isAuthed, async (req, res) => {
  const cubeData = req.body; // destructured body from form

  await cubeManager.update(req.params.cubeId, cubeData);

  res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;
