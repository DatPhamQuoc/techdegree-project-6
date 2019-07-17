const express = require('express');
const app = express();
const data = require("./data/data.json");

app.set('view engine', 'pug');
app.use('/static',express.static('public'));


// Render homepage route
app.get('/',(req,res)=> {
  res.render('index',{projects: data.properties})
});

// Dynamically render project route
app.get('/project/:id',(req,res)=>{
  const projectID = req.params.id;
  res.render('project', {
    title: data.properties[projectID].project_name,
    description: data.properties[projectID].description,
    technologies: data.properties[projectID].technologies,
    liveDemo:  data.properties[projectID].live_link,
    githubLink: data.properties[projectID].github_link,
    images: data.properties[projectID].image_urls
  });
});

// Render about route
app.get("/about", (req,res)=>{
  res.render('about');
});

// Create error object
app.use((req,res,next)=>{
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error middlewear
app.use((err,req,res,next)=>{
  res.locals.error = err;
  res.render('error')
})


app.listen(3000)
