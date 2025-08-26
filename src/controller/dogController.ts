import { dogModel } from "../models/dog-model";
import { dogDatabase } from "../repository/dog-repository";
import { Request, Response } from "express";
import * as consultaController from "../controller/consultaController"

export const getDog = async (req: Request, res: Response)  => {//////////////GET
    return res.json(dogDatabase);
};


export const createDog = async (req: Request, res: Response) => {///////////////////POST

    const newDog: dogModel = req.body; //contém os dados que o cliente enviou na requisição para criar o carro (deve ser um objeto com os campos do dogModel).
    dogDatabase.push(newDog); //adiciona esse novo carro no array dogDatabase
    return res.status(201).json(newDog); //envia o carro criado de volta para o cliente com o status HTTP
}


export const deleteDog = (req: Request, res: Response) => {//////////////////DELETE

    const id = Number(req.params.id); 
    //converte o id que vem como string na URL para número.

    const index = dogDatabase.findIndex(car => car.id === id); 
    //busca o índice do carro que tem esse id no array.

    if(index !== -1){ //Se encontrar (index !== -1), usa splice para remover o cachorro do array.
        dogDatabase.splice(index, 1);
        consultaController.deleteConsult;
        return res.status(200).send({ message: "Carro deletado com sucesso" });
    }
    else{
        return res.status(404).json({ message: "Carro não encontrado" });
    }

    
}

export const updateDog = (req: Request, res: Response) => {/////////////PATCH
    const id = Number(req.params.id);
    //Extrai o id que veio na URL e converte para number.
    //params.id sempre vem como string, então o Number() é para comparar corretamente com o id(number) do banco de dados.
    
    
    const index = dogDatabase.findIndex(car => car.id === id); 
    //busca o índice do carro que tem esse id no array.

    if (index !== -1) {
        const updatedog: dogModel = { ...dogDatabase[index], ...req.body };
        //É usado o spread operator (...) para criar 
        //um novo objeto, mesclando os dados antigos com os novos:
        
        
        dogDatabase[index] = updatedog;
        //Substitui o carro antigo no banco com o novo carro atualizado.
        
        return res.json(updatedog);
        //Retorna o novo objeto como resposta da requisição.
        
    } else {
        return res.status(404).json({ message: "Carro não encontrado" });
    }
};