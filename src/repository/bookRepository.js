import fs from "fs";

const dataJson = fs.readFileSync("./src/database/books.json", "utf8");

const dataParser = JSON.parse(dataJson);

const gettAll = () => {
  return dataParser.data;
};

const getOne = (id) => {
  const book = dataParser.data.find((book) => book.id === +id);

  return book;
};

const add = (newBook) => {
  const updatedBooks = [newBook, ...dataParser.data];
  return fs.writeFileSync(
    "./src/database/books.json",
    JSON.stringify({
      data: updatedBooks,
    })
  );
};

export default { gettAll, getOne, add };
