const { Router } = require('express');
const { body } = require('express-validator');
const companyController = require('../controllers/company.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = new Router();

router.get('/', companyController.getAllCompanies);
router.get('/my', authMiddleware, companyController.getMyCompany);
router.get('/:id', companyController.getCompanyById);
// router.get('/acceptInvite/:key', authMiddleware, companyController.acceptInvite);
router.post(
  '/',
  authMiddleware,
  body('name').trim().isLength({ min: 3, max: 50 }),
  companyController.createCompany,
);
router.patch(
  '/:id',
  authMiddleware,
  body('name').trim().isLength({ min: 3, max: 50 }),
  companyController.updateCompanyById,
);
router.delete('/:id', authMiddleware, companyController.deleteCompanyById);

module.exports = router;
