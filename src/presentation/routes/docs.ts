import { Router } from "express";
import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';
import { BuildPDF } from "../docs/carta_culminacion";
import { GetSeminarianDTO, GetSeminarianUseCase, SeminarianRepository } from "../../domain";
import { prisma } from "../../data/postgres";
const router = Router();
//router.get('/constance', async (req: Request, res: Response) => {});

module.exports = router;