import * as yup from "yup";

const productInputMiddleware = async (ctx, next) => {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      // id: yup.number().positive().integer().required(),
      name: yup.string().required(),
      product: yup.string().required(),
      color: yup.string(),
      price: yup.number().positive().required(),
      image: yup.string().url().nullable(),
      description: yup.string(),
      createdAt: yup.date(),
    });

    await schema.validate(postData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
};

export default productInputMiddleware;
