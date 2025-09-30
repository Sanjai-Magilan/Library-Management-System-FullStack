const LibSch = require("../models/schema");
module.exports = {
  // GET ALL
  GetAll: async (req, res) => {
    const books = await LibSch.find();
    if (books) res.status(200).send(books);
    else res.status(404).res("no books available");
  },

  GetSet: async (req, res) => {
    try {
      const start = req.params.start;
      const end = req.params.end;
      const skipCount = start - 1;
      const limitCount = end - start + 1;

      const books = await LibSch.find().skip(skipCount).limit(limitCount);
      res.status(200).send(books);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  //GET BY NAME
  GetByName: async (req, res) => {
    try {
      const name = req.params.name;
      const getbook = await LibSch.find({
        name: { $regex: new RegExp(name, "i") },
      });
      if (getbook) res.status(200).send(getbook);
      else res.status(404).send("Book not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  //GET BY ID
  GetById: async (req, res) => {
    try {
      const id = req.params.id;
      const getbook = await LibSch.findOne({ id: id });
      if (getbook) res.status(200).send(getbook);
      else res.status(404).send("Book not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  //SORT BY AUTHOR
  SortByAuthor: async (req, res) => {
    try {
      const author = req.params.author;
      const allBooks = await LibSch.aggregate([
        {
          $addFields: {
            priority: { $cond: [{ $eq: ["$author", author] }, 0, 1] },
          },
        },
        { $sort: { priority: 1 } },
      ]);

      if (allBooks.length > 0) res.status(200).send(allBooks);
      else res.status(404).send("Author not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  //SORT BY DATE
  SortByDate: async (req, res) => {
    try {
      const order = Number(req.params.order);
      if (order !== 1 && order !== -1)
        return res
          .status(400)
          .send({ error: "Invalid order, must be 1 (asc) or -1 (desc)" });
      const book = await LibSch.find().sort({ time: order });
      res.status(200).send(book);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  //ADD BOOk
 AddBook: async (req, res) => {
    try {
      const lastbook = await LibSch.findOne().sort({ id: -1 });
      const nextId = lastbook ? lastbook.id + 1 : 1;
      const book = new LibSch({ ...req.body, id: nextId });
      await book.save();
      res.status(201).send(book);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },


  // DELETE BY ID
  DeleteBook: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const Delbook = await LibSch.deleteOne({ id: id });
      if (Delbook.deletedCount != 0) res.status(200).send(Delbook);
      else res.status(404).send("Book not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
  // DELETE BY NAME
  DeleteByName: async (req, res) => {
    try {
      const name = req.params.name;
      const Delbook = await LibSch.deleteOne({ name: name });
      if (Delbook.deletedCount != 0) res.status(200).send(Delbook);
      else res.status(404).send("Book not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // UPDATE BY ID
  update: async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
      const book = await LibSch.findOneAndUpdate({ id: id }, updates, {
        new: true,
      });

      if (!book) return res.status(404).send("book not found");
      else res.status(200).send(book);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};
