import { Request, Response } from 'express';
import { studentService } from "../services";

export const getAll = async (req: Request, res: Response) => {
  try {
    const students =  await studentService.getAll();
    return res.status(200).json(students)
  } catch(error) {
    return res.status(500).json(error)
  }
}