import Router from "express";
import PostContoller from "../controller/PostContoller.js";
import UserController from "../controller/UserController.js";
import AnimeController from "../controller/AnimeController.js";
import TokenService from "../services/jwt-token.js"
const router = new Router();
router.get('/me', TokenService.authMiddleware, UserController.checkAuth)
router.get('/users', UserController.getAll)
router.post('/registration', UserController.registration)
router.get('/activate/:link', UserController.activate)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

router.get('/admin/getUsers', UserController.getAll, UserController.requireAdmin, UserController.checkAuth)

router.put('/comments/update', PostContoller.update)


router.get("/anime/filter", AnimeController.filters)
router.get("/anime", AnimeController.getAll);
router.get("/anime/new", AnimeController.getNewAll);
router.get("/anime/search", AnimeController.search)

router.post('/anime/:id/comments', PostContoller.create)
router.get('/anime/:id/comments', PostContoller.getAll)
router.get("/anime/:id", AnimeController.getOne);
router.delete('/posts/:id', PostContoller.delete)
router.get('/posts/:id', PostContoller.getOne)
router.get(
  "/anime/:id/episodes",
  AnimeController.getEpisodes
);

router.get(
  "/anime/:id/episodes/:episode",
  AnimeController.getEpisode
);

export default router;
