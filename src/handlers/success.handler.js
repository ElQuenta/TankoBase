import { request, response } from 'express';

export function NoContentResponseHandler(res) {
  res.status(204).send();
}

export function CreatedResponseHandler(res, data) {
  res.status(201).json({ success: true, code: 201, data });
}

export function SuccessResponseHandler(res, data) {
  res.status(200).json({ success: true, code: 200, data });
}
