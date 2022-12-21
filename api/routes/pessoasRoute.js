const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas/:id', PessoaController.getAPerson);
router.get('/pessoas', PessoaController.getAllPeople);
router.post('/pessoas', PessoaController.createPerson);
router.put('/pessoas/:id', PessoaController.updatePerson);
router.delete('/pessoas/:id', PessoaController.deleteAPerson);

// matriculas
router.get(
  '/pessoas/:estudanteId/matriculas/:matriculaId',
  PessoaController.getOneMatricula
);
router.get(
  '/pessoas/:estudanteId/matriculas',
  PessoaController.getAllMatriculasFromAStudent
);
router.post(
  '/pessoas/:estudanteId/matriculas',
  PessoaController.createAMatricula
);
router.put(
  '/pessoas/:estudanteId/matriculas/:matriculaId',
  PessoaController.updateAMatriculaFromAStudent
);
router.delete(
  '/pessoas/:estudanteId/matriculas/:matriculaId',
  PessoaController.deleteAMatricula
);

module.exports = router;
