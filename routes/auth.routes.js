import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middlewares/auth-middleware.js';
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';
import passport from 'passport'
import '../services/microsoft-strategy.js' // Asegúrate de importar el strategy


const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
router.get('/getUser', authenticateToken, (req, res) => {
  res.send({ user: req.user, message: "aqui se podra poner lo que se quiera traer de la ruta puede ser un formulario un objeto o algo"})
}); // Añade esta ruta si necesitas obtener el usuario autenticado

// Login con Microsoft
router.get('/microsoft', passport.authenticate('microsoft'));

router.get('/microsoft/callback',
  passport.authenticate('microsoft', { session: false }),
  AuthController.microsoftCallback
);

export default router;
