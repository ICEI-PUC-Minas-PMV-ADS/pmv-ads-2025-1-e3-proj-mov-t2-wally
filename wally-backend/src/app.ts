import fastify from "fastify"
import "reflect-metadata"

const server = fastify({
    logger: true
});


const users = []

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

server.post("/users", (request, reply) => {
    const { id, name, email } = request.body

    users.push({ id, name, email })

    return reply.status(201).send({ id, name, email })
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
    console.log("HTTP server running!")
})