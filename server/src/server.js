import dotenv from "dotenv"
import app from "./app.js";

dotenv.config()


const PORT = process.env.PORT || 5001;
console.log(process.env.JWT_SECRET)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
