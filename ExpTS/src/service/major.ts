import { PrismaClient, Major } from "@prisma/client";

import { CreateMajorDto } from "../types/major";

const prisma = new PrismaClient()

export const createMajor = async (major: CreateMajorDto): Promise<Major> => {
    return prisma.major.create({ data: major });
}; 

export const getMajors = async (): Promise<Major[]> =>{
    return prisma.major.findMany();
};

export const getMajor = async(id: string): Promise<Major | null> => {
    return prisma.major.findUnique({where: {id}});
};

export const updateMajor = async (id: string, major: CreateMajorDto): Promise<Major> => {
    return prisma.major.update({ where: { id }, data: major });
};

export const deleteMajor = async (id: string): Promise<Major> => {
    return prisma.major.delete({ where: { id } });
};