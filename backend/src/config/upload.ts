import multer from "multer";
import { join } from "path";

export default {
  storage: multer.diskStorage({
    destination: join(__dirname, "..", "..", "uploads"),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname.trim()}`;

      cb(null, fileName);
    },
  }),
};
