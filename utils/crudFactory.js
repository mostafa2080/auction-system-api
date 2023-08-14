const asyncHandler = require('express-async-handler');
const apiError = require('./apiError');

function createCrudHandlers(Model) {
  const getAll = asyncHandler(async (req, res, next) => {
    const items = await Model.findAll();
    res.status(200).json({ status: 'success', data: items });
  });

  const createOne = asyncHandler(async (req, res, next) => {
    const item = await Model.create(req.body);
    res.status(201).json({ status: 'success', data: item });
  });

  const getById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const item = await Model.findByPk(id);
    if (!item) {
      throw new apiError('Item not found', 404);
    }
    res.status(200).json({ status: 'success', data: item });
  });

  const updateById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const existingItem = await Model.findByPk(id);
    if (!existingItem) {
      throw new apiError('Item not found', 404);
    }
    await Model.update(req.body, { where: { id } });
    const updatedItem = await Model.findByPk(id);
    res.status(200).json({ status: 'success', data: updatedItem });
  });

  const deleteById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const existingItem = await Model.findByPk(id);
    if (!existingItem) {
      throw new apiError('Item not found', 404);
    }
    await Model.destroy({ where: { id } });
    res.status(200).json({ status: 'Deletion Success', data: existingItem });
  });

  const restoreById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const item = await Model.findByPk(id, { paranoid: false });
    if (!item) {
      throw new apiError('Item not found', 404);
    }
    if (item.deletedAt === null) {
      throw new apiError('Item is not deleted', 400);
    }
    await item.restore();
    res
      .status(200)
      .json({
        status: 'success',
        message: 'Item restored successfully',
        data: item,
      });
  });

  return {
    getAll,
    createOne,
    getById,
    updateById,
    deleteById,
    restoreById,
  };
}

module.exports = createCrudHandlers;
