const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
    publishPaper,
    getAllPapers,
    getPaperById,
    updatePaper,
    deletePaper,
    likePaper,
    unlikePaper,
    incrementView
} = require("../controllers/PaperController");

const router = express.Router();

router.route("/")
    .get(getAllPapers)
    .post(protect, publishPaper);

router.route("/:id")
    .get(incrementView, getPaperById)
    .put(protect, updatePaper)
    .delete(protect, deletePaper);

router.route("/:id/like").put(protect, likePaper);
router.route("/:id/unlike").put(protect, unlikePaper);
router.post("/:id/like", protect, likePaper);
router.post("/:id/unlike", protect, unlikePaper);

module.exports = router;
