const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [
  {
    title: 'War and Peace', genre: 'Historical Fiction', author: 'Lev Niko Tolstoy', read: false
  },
  {
    title: 'Les Miseralb', genre: 'Historical Fiction', author: 'Victor Hugo', read: false
  },
  {
    title: 'The Time Machine', genre: 'Science Fiction', author: 'H.G. Wells', read: false
  },
  {
    title: 'Journey to Center of Erth', genre: 'Science Fiction', author: 'Jules Vern', read: false
  },
  {
    title: 'The Dark world', genre: 'Fantasy', author: 'Henry Kutner', read: false
  },
  {
    title: 'The Wind in the Willows', genre: 'Fantasy', author: 'Kenneth Ghram', read: false
  },
  {
    title: 'Life on the Mississippi', genre: 'History', author: 'Mark Twain', read: false
  },
  {
    title: 'Childhood', genre: 'Biography', author: 'Lev Nik Tolstoy', read: false
  }
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correcly to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
