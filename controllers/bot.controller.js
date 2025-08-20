import jwt from 'jsonwebtoken';
import { UserRepository } from '../services/repositories/user-repository.js';
import { BotRepository } from '../services/repositories/bot-repository.js';
import path from 'path';

export const BotController = {
  async get(req, res) {
    try {
      const { user_id, rol } = req.query;

      const bots = await BotRepository.get({ user_id, rol });
      res.status(200).json(bots);
    } catch (err) {
      console.error(err);
      return res.status(err.status || 400).json({ error: err.error || 'Error al obtener bots' });
    }
  },

  async getRegistros(req, res) {
    try {
      const { bot_id } = req.query;

      const registros = await BotRepository.getRegistros({ bot_id});
      res.status(200).json(registros);
    } catch (err) {
      console.error(err);
      return res.status(err.status || 400).json({ error: err.error || 'Error al obtener los registros' });
    }
  },

  async getUsers(req, res) {
    try {

      const users = await BotRepository.getUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(err.status || 400).json({ error: err.error || 'Error al obtener los usuarios' });
    }
  },
  async getBots(req, res) {
    try {

      const bots = await BotRepository.getBots();
      res.status(200).json(bots);
    } catch (err) {
      console.error(err);
      return res.status(err.status || 400).json({ error: err.error || 'Error al obtener los bots' });
    }
  },

  async addBotsToUser(req, res) {
    try {
      const { userId, botsId } = req.body;

      const usuario = await BotRepository.addBotsToUser(userId, botsId);

      return res.status(200).json(usuario);
    } catch (error) {
      console.error('Error en addBotsToUser:', error);
      return res.status(500).json({ error: 'Error al actualizar bots del usuario' });
    }
  },

  async updateUserRol(req, res) {
    try {
      const user = req.body;

      if (!user.id || !user.rol) {
        return res.status(400).json({ error: 'Faltan datos obligatorios (id o rol)' });
      }

      const updatedUser = await BotRepository.updateUserRol(user);
      return res.status(200).json(updatedUser);
    } catch (err) {
      console.error('Error al actualizar rol:', err);
      return res.status(500).json({ error: 'Error interno al actualizar el rol del usuario' });
    }
  },

  async descargarFormato(req, res){
    const filePath = path.resolve('public/formatos/plantilla.xlsx');
    res.download(filePath, 'plantilla.xlsx', (err) => {
      if (err) {
        console.error('Error al descargar archivo:', err);
        res.status(500).json({ error: 'No se pudo descargar el archivo' });
      }
    });
  },

  async createSolicitud(req, res) {
    try {
      const { formArray, user_id, bot_id } = req.body;

      const solicitud = await BotRepository.createSolicitud( formArray, user_id, bot_id);
      return res.status(200).json(solicitud);
    } catch (error) {
      console.error('Error en createSolicitud:', error);
      return res.status(500).json({ error: 'Error al crear la solicitud del usuario' });
    }
  },
};

