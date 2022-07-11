const express = require("express");
const router = express.Router();
const ProductModel = require("../db/models/productModel");

router.get("/", async (req, res) => {
  res.send(await ProductModel.find());
});

router.get("/:id", (req, res) => {
  ProductModel.findById(req.params.id, (err, doc) => {
    if (err) {
      res.status(404).send({ error: `Could not find entry: ${req.params.id}` });
    } else {
      res.send(doc);
    }
  });
});

router.post("/", (req, res) => {
  ProductModel.create(req.body, (err, doc) => {
    if (err) {
      res.status(422).send({ error: err.message });
    } else {
      res.status(401).send(doc);
    }
  });
});

router.delete("/:id", (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id, () => res.sendStatus(204));
});

router.put("/:id", async (req, res) => {
  res.send(
    await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
  );
});

module.exports = router;
