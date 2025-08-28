import { dogModel } from "../models/dog-model";
import { dogDatabase } from "../repository/dog-repository";
import { Request, Response } from "express";

import { consultasDatabase } from "../repository/consult-repository";

export const getDog = async (req: Request, res: Response)  => {//////////////GET
    return res.json(dogDatabase);
};

// GET dog por id
export const getDogById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const dog = dogDatabase.find(dog => dog.id === id);

  if (!dog) {
    return res.status(404).json({ message: "Cachorro não encontrado" });
  }

  return res.json(dog);
};

export const createDog = async (req: Request, res: Response) => {///////////////////POST

    const newDog: dogModel = req.body; 
    //contém os dados que o cliente enviou na requisição para criar o cachorro (deve ser um objeto com os campos do dogModel).

    dogDatabase.push(newDog);
    return res.status(201).json(newDog); 
}


export const deleteDog = (req: Request, res: Response) => {//////////////////DELETE

    const id = Number(req.params.id); 
    //converte o id que vem como string na URL para número.

    const index = dogDatabase.findIndex(dog => dog.id === id); 
    //busca o índice do cachorro que tem esse id no array.

    if(index !== -1){ //Se encontrar (index !== -1), usa splice para remover o cachorro do array.
        dogDatabase.splice(index, 1);

        // Inicia no último índice do array e percorre até o primeiro (de trás para frente)
        for (let i = consultasDatabase.length - 1; i >= 0; i--) {

            // Se o objeto no índice atual tiver o id do cachorro igual ao id procurado
            if (consultasDatabase[i].idCachorro === id) {
                consultasDatabase.splice(i, 1);
            }
        }
        return res.status(200).send({ message: "Cachorro deletado com sucesso" });
    }
    else{
        return res.status(404).json({ message: "Cachorro não encontrado" });
    }

    
}

export const updateDog = (req: Request, res: Response) => {/////////////PATCH
    const id = Number(req.params.id);
    //Extrai o id que veio na URL e converte para number.
    
    const index = dogDatabase.findIndex(car => car.id === id); 
    //busca o índice do carro que tem esse id no array.

    if (index !== -1) {
        const updatedog: dogModel = { ...dogDatabase[index], ...req.body };
        //É usado o spread operator (...) para criar 
        //um novo objeto, mesclando os dados antigos com os novos:
        
        
        dogDatabase[index] = updatedog;
        
        return res.json(updatedog);
        //Retorna o novo objeto como resposta da requisição.
        
    } else {
        return res.status(404).json({ message: "Carro não encontrado" });
    }
};