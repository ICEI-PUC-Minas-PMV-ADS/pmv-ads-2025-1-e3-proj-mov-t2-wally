import fastify from "fastify"
import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { UsuariosRepositorio } from "./repositorios/UsuariosRepositorio";

const server = fastify({
    logger: true
});


const users = []


const usuariosRepositorio = new UsuariosRepositorio()


server.get("/users", (request, reply) => {
    return reply.send(users)
})

server.get("/users/:email", (request, reply) => {
    const { email } = request.params

    const user = users.find(user => user.email === email)

    if (!user) {
        return reply.status(404).send({ message: "User not found" })
    }

    return reply.send(user)
})

server.post("/users", async (request, reply) => {
    const { email, nome, senha, avatar_url } = request.body

    const emailUtilizado = await usuariosRepositorio.findByEmail(email)

    if (emailUtilizado) {
        return reply.status(400).send({ message: "Email já cadastrado" })
    }

    //

    const usuario = await usuariosRepositorio.create({
        email,
        nome,
        senha,
        avatar_url
    })

    return reply.status(201).send(usuario)
})

server.put("/users/:id", (request, reply) => {
    const { id } = request.params

    const { name, email } = request.body



    const index = users.findIndex(user => user.id === Number(id))

    if (index >= 0) {
        users[index].name = name
        users[index].email = email

        return reply.status(200).send(users[index])
    }

    return reply.status(404).send({ message: "User not found" })
})


server.delete("/users/:id", (request, reply) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === Number(id))

    if (index >= 0) {
        users.splice(index, 1)

        return reply.status(200).send({ message: "User deleted successfully" })
    }

    return reply.status(404).send({ message: "User not found" })
})

server.listen({ port: 3333 }).then(() => {
    AppDataSource.initialize().then(() => {
        console.log("Database connected")
    }).catch(error => console.log(error))

    console.log("Server HTTP is running on port 3333")
})