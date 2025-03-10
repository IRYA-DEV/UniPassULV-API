import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 3000; // Define el puerto solo aquí

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
