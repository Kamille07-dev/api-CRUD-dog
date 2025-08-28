import { consultModel } from "../models/consulta-model";
import { consultasDatabase } from "../repository/consult-repository";
import { Request, Response } from "express";
import { dogDatabase } from "../repository/dog-repository";

export const getConsult = async (req: Request, res: Response)  => {//////////////GET
    return res.json(consultasDatabase);
};

// GET consulta por id
export const getConsultById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const consulta = consultasDatabase.find(c => c.idConsulta === id);

    if (!consulta) {
        return res.status(404).json({ message: "Consulta não encontrada" });
    }
    return res.json(consulta);
};


//cria consulta, só se cachorro existir
export const createConsult = async (req: Request, res: Response) => {///////////////////POST

    const newConsult: consultModel = req.body; //contém os dados que o cliente enviou na requisição para criar o consulta (deve ser um objeto com os campos do consultModel).
    const dogExists = dogDatabase.some(dog => dog.id === newConsult.idCachorro);
  
    if (!dogExists) {
        return res.status(400).json({ message: "Cachorro não encontrado para essa consulta." });
    }

    consultasDatabase.push(newConsult); 
    return res.status(201).json(newConsult); 
}


export const deleteConsult = (req: Request, res: Response) => {//////////////////DELETE

    const id = Number(req.params.id); 
    //converte o id que vem como string na URL para número.

    const index = consultasDatabase.findIndex(consult => consult.idConsulta === id); 
    //busca o índice do consulta que tem esse id no array.

    if(index !== -1){ //Se encontrar (index !== -1), usa splice para remover o consulta do array.
        consultasDatabase.splice(index, 1);
        return res.status(200).json({ message: "Consulta deletada com sucesso" });
    } 
    else {
        return res.status(404).json({ message: "Consulta não encontrada" });
    }
}

export const updateConsult = (req: Request, res: Response) => {/////////////PATCH
    const id = Number(req.params.id);
    //Extrai o id que veio na URL e converte para number.
    
    
    const { idCachorro } = req.body;
    
    const index = consultasDatabase.findIndex(consult => consult.idConsulta === id); 
    //busca o índice da consulta que tem esse id no array.


    // Se idCachorro foi fornecido (não é undefined)
    if (idCachorro !== undefined) {

        // Verifica se existe algum cachorro no banco de dados com o id informado
        const dogExists = dogDatabase.some(dog => dog.id === idCachorro);
        if (!dogExists) {
            return res.status(400).json({ message: "Cachorro não encontrado para essa consulta." });
        }
    }
    if (index !== -1) {
        const updateConsult: consultModel = { ...consultasDatabase[index], ...req.body };
        //É usado o spread operator (...) para criar 
        //um novo objeto, mesclando os dados antigos com os novos:
        
        
        consultasDatabase[index] = updateConsult;
        //substitui o consulta antigo no banco com o nova consulta atualizado.
        
        return res.json(updateConsult);
        
    } else {
        return res.status(404).json({ message: "Consulta não encontrada" });
    }
};