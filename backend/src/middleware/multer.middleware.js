import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/Input');
    },
    filename: (req, file, cb) => {
        cb(null, "sat.jpg");
    }
});

export const upload = multer({storage});