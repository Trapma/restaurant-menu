"use strict";
const express = require("express");
const cors = require("cors")
const upload = require('./middleware/upload')
const db = require('./db/restaurantMenu')





const app = express();
const PORT = 3000


const corsOptions = {
  // credentials: true,
  origin: '*',  // смени на http://<имя своего домена
  // allowedHeaders: ['Content-Type', 'Content-Length'],
  // optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use('/dishes', upload.single('image'))
app.use("/dishes/:id", upload.single('image'))



app.post("/dishes", async (req, res) => {
  // console.log('reqBody test',req.body);
  // console.log('regFiles test', req.file);
  // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  // console.log('reqFile path test', req.file.path);
  const data = {
    kind: req.body.kind,
    category: req.body.category,
    type: req.body.type,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    ccal: req.body.ccal,
    photo: req.body.photo
  }

    const results = await db.createDish(data);
    res.status(201).json({id: results[0]});


  console.log(data);

});

app.post("/kind", async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  const result = await db.createKind(req.body);
  console.log(req.body);
  res.status(201).json({ result })
})

app.post("/type", async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  const result = await db.createType(req.body);
  console.log(req.body);
  res.status(201).json({ result })
})

app.patch("/dishes/:id", async (req, res) => {

  const data = {
    kind: req.body.kind,
    category: req.body.category,
    type: req.body.type,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    ccal: req.body.ccal,
    photo: req.file ? req.file.path : ''
  }
  const id = await db.updateDish(req.params.id, data);
  res.status(200).json({ id });
});

app.get("/dishes", async (req, res) => {
  const dishes = await db.gettAllDish();
  res.status(200).json({ dishes });
});

app.get("/kind", async(req, res) => {
  const kindes = await db.getAllKind()
  res.status(200).json({ kindes })
})

app.get("/data", async (req, res) => {
  const kind = await db.getAllKind();
  const category = await db.getAllCategory();
  const type = await db.getAllType()

  res.status(200).json({ kind, category, type})
})



app.delete("/dishes/:id", async (req, res) => {
  await db.deleteDish(req.params.id);
  res.status(200).json({ success: true });
});
app.delete("/kind/:name_kind", async (req,res) => {
  await db.deleteKind(req.params.name_kind);
  res.status(200).json({success:true})
})
app.delete("/type/:name_type", async (req, res) => {
  await db.deleteType(req.params.name_type);
  res.status(200).json({success: true})
})

//kind


// app.get("/category", async (req, res) => {
//   const category = await db.getAllCategory();
//   res.status(200).json({ category });
// });
// app.get("/kindOfKitchen", async (req, res) => {
//   const kind = await db.getAllKind();
//   res.status(200).json({ kind });
// });

app.listen(PORT, () =>
  console.log("Server is listening on http://localhost:" + PORT)
);
