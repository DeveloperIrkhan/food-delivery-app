import jwt from "jsonwebtoken";

const requiredSignInAsync = (req, res, next) => {
  try {
    //taking token from users header
    const { token } = req.headers;
    if (!token)
      return res.status(401).send({
        success: false,
        message: "you are not login",
      });
    const decodeedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.body.userId = decodeedToken.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "error in meddleware",
      error,
    });
  }
};

export default requiredSignInAsync;
