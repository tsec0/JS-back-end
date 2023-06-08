const router = require("express").Router();

const cubeManager = require("../managers/cubeManager");
const accessoryManager = require("../managers/accessoryManager");

// URL -> Path /cubes/create
router.get("/create", (req, res) => {
  // console.log(req.user); // has been passed by the middleware
  res.render("cube/create");
});

router.post("/create", async (req, res) => {
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

router.get('/:cubeId/details', async (req, res) => {
  // .lean() can be added here -> it is a querry to be used for
  // -> .lean() -> {materialize} to plain object
  // than await
  const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();

  if(!cube){
    return res.redirect('/404');
  }

  res.render('cube/details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager.getOthers(cube.accessories).lean(); // those which are available
  const hasAccessories = accessories.length > 0;

  res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
  const { accessory: accessoryId } = req.body;
  const cubeId = req.params.cubeId;

  await cubeManager.attachAccessory(cubeId, accessoryId);

  res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', async (req, res) => {
  // give info in the page
  const cube = await cubeManager.getOne(req.params.cubeId).lean(); // this is a document -> turn it to objec

  // pass the cube to the view
  res.render('cube/delete', { cube });
});

router.post('/:cubeId/delete', async (req, res) => {
  // request to delete cube from DB
  await cubeManager.delete(req.params.cubeId);

  res.redirect('/');
});

// get the selected difficulty option / it is a view data
function getDifficultyOptionsViewData(difficultyLevel){
    const titles = [
      "Very Easy",
      "Easy",
      "Medium (Standard 3x3)",
      "Intermediate",
      "Expert",
      "Hardcore",
    ];

    const options = titles.map((title, index) => ({
      title: `${index + 1} - ${title}`,
      value: index + 1,
      selected: Number(difficultyLevel) === index + 1 ? 'selected' : "",
    }));

    return options;
}

router.get('/:cubeId/edit', async (req, res) => {
  // visualize data
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  const options = getDifficultyOptionsViewData(cube.difficultyLevel);

  res.render('cube/edit', { cube, options });
});

router.post('/:cubeId/edit', async (req, res) => {
  const cubeData = req.body; // destructured body from form

  await cubeManager.update(req.params.cubeId, cubeData);

  res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;
