const mongoose = require("mongoose");

mongoose
  .connect(
    // "mongodb+srv://admin:7ZPblcIXRwWYDeF4@cluster0.98rdb.mongodb.net/mccmsDB",
    "mongodb+srv://admin:7ZPblcIXRwWYDeF4@cluster0.98rdb.mongodb.net/mccmsDB?retryWrites=true&w=majority"
    {
      useNewUrlParser: true,
    }
  )
  .catch((err) => {
    if (err) throw err;
    console.log("Database Connected Successfully");
  });
