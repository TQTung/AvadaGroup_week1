import bookHandlers from "../../repository/bookRepository.js";

const { gettAll, getOne, add } = bookHandlers;

const getAllBooks = async (ctx) => {
  try {
    const books = gettAll();
    ctx.body = {
      data: books,
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
};

const getOneBook = async (ctx) => {
  try {
    const { id } = ctx.params;
    const book = getOne(id);
    if (!book) {
      ctx.status = 404;
      return (ctx.body = {
        success: false,
        message: `Book not found with id: ${id}`,
      });
    }

    return (ctx.body = {
      success: true,
      data: book,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

const addBook = async (ctx) => {
  try {
    const postData = ctx.request.body;
    add(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

export default { getAllBooks, getOneBook, addBook };
