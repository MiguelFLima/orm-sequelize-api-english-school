const database = require('../models');

class PessoaController {
  static async getAllPeople(req, res) {
    try {
      // buscar todas as pessoas
      const allPeople = await database.Pessoas.findAll();
      // Retornar com status 200 e em json
      return res.status(200).json(allPeople);
      // Tratamento de erro
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async getAPerson(req, res) {
    const { id } = req.params;

    try {
      const aPerson = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(aPerson);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async createPerson(req, res) {
    const newPerson = req.body;

    try {
      const personCreated = await database.Pessoas.create(newPerson);
      return res.status(201).json(personCreated);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async updatePerson(req, res) {
    const { id } = req.params;
    const newInfo = req.body;

    try {
      await database.Pessoas.update(newInfo, {
        where: { id: Number(id) },
      });
      const personUpdated = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(personUpdated);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  static async deleteAPerson(req, res) {
    const { id } = req.params;

    try {
      await database.Pessoas.destroy({
        where: { id: Number(id) },
      });
      return res.status(200).json('Usuário deletado');
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Get one Matricula
  static async getOneMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const matricula = await database.Matriculas.findOne({
        where: { estudante_id: Number(estudanteId), id: Number(matriculaId) },
      });
      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Matriculas of one person
  static async getAllMatriculasFromAStudent(req, res) {
    try {
      const { estudanteId } = req.params;
      const matriculas = await database.Matriculas.findAll({
        where: { estudante_id: Number(estudanteId) },
      });
      return res.status(200).json(matriculas);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Create A matricula To A Student
  static async createAMatricula(req, res) {
    try {
      const { estudanteId } = req.params;
      const matriculaInfo = { ...req.body, estudante_id: Number(estudanteId) };
      const newMatricula = await database.Matriculas.create(matriculaInfo);
      return res.status(201).json(newMatricula);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Update A Matricula From a Student
  static async updateAMatriculaFromAStudent(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const newInfo = req.body;
      await database.Matriculas.update(newInfo, {
        where: { id: Number(matriculaId), estudante_id: estudanteId },
      });
      const updatedMatricula = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) },
      });
      return res.status(200).json(updatedMatricula);
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }

  // Delete A Matricula From A Student
  static async deleteAMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      await database.Matriculas.destroy({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      return res.status(200).json({
        message: `Mátricula ${matriculaId}  foi excluída com sucesso`,
      });
    } catch (error) {
      return res.status(500).json(error.mensagem);
    }
  }
}

module.exports = PessoaController;
