import * as WorkService from '../services/work.service.js';

import { CreatedResponseHandler, SuccessResponseHandler, NoContentResponseHandler } from '../handlers/success.handler.js'
import { ErrorResponseHandler } from '../handlers/error.handler.js'

export const getAllWorks = async (req, res) => {
  try {
    const filters = req.query;
    const works = await WorkService.getAllWorks(filters);
    SuccessResponseHandler(res, works);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const createWork = async (req, res) => {
  try {
    const workData = req.body;
    const newWork = await WorkService.createWork(workData);
    CreatedResponseHandler(res, newWork);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const getWorkById = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await WorkService.getWorkById(id);
    SuccessResponseHandler(res, work);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const updateWork = async (req, res) => {
  try {
    const { id } = req.params;
    const workData = req.body;
    const updatedWork = await WorkService.updateWorkById(id, workData);
    SuccessResponseHandler(res, updatedWork);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};

export const deleteWork = async (req, res) => {
  try {
    const { id } = req.params;
    await WorkService.deleteWorkById(id);
    NoContentResponseHandler(res);
  } catch (error) {
    ErrorResponseHandler(res, error);
  }
};
