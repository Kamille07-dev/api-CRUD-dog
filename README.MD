# API CRUD - Cachorros e Consultas

Esta é uma API RESTful desenvolvida em **Node.js**, **TypeScript** e **Express** para gerenciamento de **cachorros** e suas **consultas veterinárias**.

A API permite criar, consultar, atualizar e deletar registros de cachorros e suas consultas. Não utiliza banco de dados real; os dados são armazenados em arrays em memória.

---

## Tecnologias

- Node.js
- TypeScript
- Express
- tsx (para rodar o TypeScript diretamente)
- VSCode (sugestão de IDE)

---

##Observações

Os dados são armazenados apenas em memória, ou seja, ao reiniciar o servidor, todos os registros são perdidos.

A API garante que não seja possível criar consultas para cachorros inexistentes.

Ao deletar um cachorro, todas as suas consultas são automaticamente removidas.
