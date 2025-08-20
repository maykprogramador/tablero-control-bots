import jwt from 'jsonwebtoken';
import { UserRepository } from '../services/repositories/user-repository.js';


export const UserController = {
  async getSolicitudes(req, res) {
    try {
      const { user_id, rol } = req.query;

      const solicitudes = await UserRepository.getSolicitudes( user_id, rol);
      res.status(200).json(solicitudes);
    } catch (err) {
      console.error(err);
      return res.status(err.status || 400).json({ error: err.error || 'Error al obtener las solicitudes' });
    }
  }

};

