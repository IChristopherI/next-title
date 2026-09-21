import Router from "express";
import PostContoller from "../controller/PostContoller.js";
import UserController from "../controller/UserController.js";
import AnimeController from "../controller/AnimeController.js";
import TokenService from "../services/jwt-service.js"
import { requireRole } from "../middleware/require-role.js";
import { authenticate } from "../middleware/authenticate.js";
const router = new Router();

router.get('/me', authenticate, UserController.checkAuth)
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)

router.get('/users', UserController.getAll)
router.get('/admin/getUsers', authenticate,  requireRole('ADMIN'), UserController.getAll)

router.get("/anime", AnimeController.getAll);
router.get("/anime/filter", AnimeController.filters)
router.get("/anime/new", AnimeController.getNewAll);
router.get("/anime/search", AnimeController.search)

router.post('/anime/:id/comments', PostContoller.create)
router.get('/anime/:id/comments', PostContoller.getAll)
router.put('/comments/update', PostContoller.update)
router.delete('/comments/:id', PostContoller.delete)
router.get('/posts/:id', PostContoller.getOne)


router.get("/anime/:id", AnimeController.getOne);
router.get("/anime/:id/episodes", AnimeController.getEpisodes);
router.get("/anime/:id/episodes/:episode",AnimeController.getEpisode);

export default router;
