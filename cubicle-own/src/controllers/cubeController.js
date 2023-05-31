const router = require("express").Router();

const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");

// URL -> Path /cubes/create
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;

  // res.send('Form submitted');
  await cubeManager.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });

  res.redirect("/");
});

router.get('/:cubeId/details', async (req, res) => {
  // .lean() can be added here -> it is a querry to be used for
  // -> .lean() -> {materialize} to plain object
  // than await
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  if(!cube){
    return res.redirect('/404');
  }

  res.render('details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  const accessories = await accessoryManager.getAll().lean();

  res.render('accessory/attach', { cube, accessories });
});

module.exports = router;
