import { Server, ic } from 'azle';
import cors from "cors";
import express from 'express';



type Ticket = {
    name: string;
    number: number;
    date: string;
    time: string;
    food: string;
    price: string;
    description: string;
};

let tickets: Ticket[] = [{
    name: "Erik",
    number: 1,
    date: "12/12/2005",
    time: "12:00:12",
    food: "pizza",
    price: "$ 70",
    description: "sin queso"
}];

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // app.use((req, res, next) => {
    //     if (ic.caller().isAnonymous()) {
    //         res.status(401);
    //         res.send();
    //     } else {
    //         next();
    //     }
    // });}


    app.get("/get", (req, res) => {
                res.json(tickets);
            });
        
            app.post("/post", (req, res) => {
                const newTicket: Ticket = req.body;
                const lastTicketNumber = tickets.length > 0 ? tickets[tickets.length - 1].number : 0;
                newTicket.number = lastTicketNumber + 1;
                //newTicket.date = new Date().toISOString();
                tickets.push(newTicket);
                res.send("Ticket creado exitosamente con la fecha y hora generadas automáticamente");
            });
        
            app.put("/update/:number", (req, res) => {
                const number = parseInt(req.params.number);
                const updatedTicket: Ticket = req.body;
                res.send("Ticket updated successfully");
            });
        
            app.delete("/delete/:number", (req, res) => {
                const number = parseInt(req.params.number);
                tickets = tickets.filter((ticket) => ticket.number !== number);
                res.send("Ticket deleted successfully");
            });
    

    app.post('/test', (req, res) => {
        res.json(req.body);
    });

    app.get('/whoami', (req, res) => {
        res.statusCode = 200;
        res.send(ic.caller());
    });

    app.get('/health', (req, res) => {
        res.send().statusCode = 204;
    });

    return app.listen();
});
