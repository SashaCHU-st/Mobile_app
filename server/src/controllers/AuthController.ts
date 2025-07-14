import { FastifyReply, FastifyRequest } from "fastify";
import{ pool} from "../db/db"
type SignUpBody = {
  email: string;
  name: string;
  password: string;
};

export async function signUp(req:FastifyRequest <{Body: SignUpBody}>, reply:FastifyReply) {

    console.log("I am at SignUP");

    const {email, name, password} = req.body;

    try
    {
        const newUser = await pool.query("INSERT INTO users (email,name,  password) VALUES ($1, $2, $3)", [email,name,  password]);

        return reply.code(201).send({message: "All good", newUser:newUser})

    }catch (err:any) {
    console.error("Database error:", err.message);
    return reply.code(500).send({ message: "Something went wrong" });
  }
}