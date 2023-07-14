import mongoose from "mongoose";

const connect = (app, port) => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connected");

      app.listen(port, (err) => {
        if (err) {
          console.log(err);
          process.exit();
        }

        console.log(`Server running on port ${port}.`);
      });
    })
    .catch((err) => console.log(err));
};

export default connect;
