import { consultModel } from "../models/consulta-model";
import { consultaDatabase } from "../repository/consult-repository";
import { Request, Response } from "express";

export const getConsult = async (req: Request, res: Response)  => {//////////////GET
    return res.json(consultaDatabase);
};


export const createConsult = async (req: Request, res: Response) => {///////////////////POST

    const newDog: consultModel = req.body; //contém os dados que o cliente enviou na requisição para criar o carro (deve ser um objeto com os campos do consultModel).
    consultaDatabase.push(newDog); //adiciona esse novo carro no array consultaDatabase
    return res.status(201).json(newDog); //envia o carro criado de volta para o cliente com o status HTTP
}


export const deleteConsult = (req: Request, res: Response) => {//////////////////DELETE

    const id = Number(req.params.id); 
    //converte o id que vem como string na URL para número.

    const index = consultaDatabase.findIndex(car => car.idCachorro === id); 
    //busca o índice do carro que tem esse id no array.

    if(index !== -1){ //Se encontrar (index !== -1), usa splice para remover o carro do array.
        consultaDatabase.splice(index, 1);
        return res.status(200).send({ message: "Carro deletado com sucesso" });
    }
    else{
        return res.status(404).json({ message: "Carro não encontrado" });
    }
}

export const updateConsult = (req: Request, res: Response) => {/////////////PATCH
    const id = Number(req.params.id);
    //Extrai o id que veio na URL e converte para number.
    //params.id sempre vem como string, então o Number() é para comparar corretamente com o id(number) do banco de dados.
    
    
    const index = consultaDatabase.findIndex(car => car.idCachorro === id); 
    //busca o índice do carro que tem esse id no array.

    if (index !== -1) {
        const updatedog: consultModel = { ...consultaDatabase[index], ...req.body };
        //É usado o spread operator (...) para criar 
        //um novo objeto, mesclando os dados antigos com os novos:
        
        
        consultaDatabase[index] = updatedog;
        //Substitui o carro antigo no banco com o novo carro atualizado.
        
        return res.json(updatedog);
        //Retorna o novo objeto como resposta da requisição.
        
    } else {
        return res.status(404).json({ message: "Carro não encontrado" });
    }
};