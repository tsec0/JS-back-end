const router = require("express").Router();

const cubeManager = require("../managers/cubeManager");

// URL -> Path /cubes/create
router.get("/create", (req, res) => {
  console.log(cubeManager.getAll());
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

router.get("/:cubeId/details", async (req, res) => {
  // .lean() can be added here -> it is a querry to be used for
  // -> .lean() -> {materialize} to plain object
  // than await
  const cube = await cubeManager.getOne(req.params.cubeId).lean();

  if(!cube){
    return res.redirect('/404');
  }

  res.render("details", { cube });
});

module.exports = router;
