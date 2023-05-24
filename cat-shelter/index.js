const http = require('http');
const fs = require('fs/promises'); // fs module return in promise

const siteCss = require('./content/styles/site');

const cats = [
    {
        id: 1,
        name: 'Navcho',
        breed: 'Persian',
        description: 'Okay, it is a nice cat!',
    },
    {
        id: 2,
        name: 'Bai Ivan',
        breed: 'Angora',
        description: 'Okay, it is a nice cat, althoug ... whatever!',
    },
    {
        id: 3,
        name: 'Garry',
        breed: 'Some Breed',
        description: 'Okay, it is a fat cat, althoug ... whatever!',
    },

];

const replaceData = (html, data) => {
  return Object.keys(data).reduce((result, key) => {
      result = result.replace(`{{${key}}}`, data[key]);
      return result;
  }, html)
}

const server = http.createServer(async (req, res) => {

  const url = req.url;
  console.log(url);

  if (url == '/') {
    const homeHtml = await fs.readFile('./views/home/index.html', 'utf-8');
    const catHtml = await fs.readFile('./views/cat.html', 'utf-8');

    const catsRes = cats.map(cat => replaceData(catHtml, cat));
    const homeRes = replaceData(homeHtml, {cats: catsRes});

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(homeRes);

  } else if(url == '/styles/site.css'){
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(siteCss);

  } else if(url == '/cats/add-bread'){
    const addBreedHtml = await fs.readFile('./views/addBreed.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(addBreedHtml);
  }

  res.end();
});

server.listen(5000, () =>
  console.log("This server is running on port 5000...")
);
