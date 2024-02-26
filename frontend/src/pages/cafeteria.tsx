"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'; 

type Ticket = {
    name: string;
    number: number;
    date: string;
    time: string;
    food: string;
    price: string,
    description: string;
};

const headers = {
    headers: {
        "Content-Type": "application/json",
    },
};

export default function CrudEventsPage() {
    useEffect(() => {
        getTickets();
    }, []);

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [ticket, setTicket] = useState<Ticket>({
        name: "Laura",
        number: 1,
        date: "12/12/2005",
        time: "10:12:30",
        food: "Pan",
        price: "$ 50",
        description: "Sin pan",
    });

    const [isEditable, setIsEditable] = useState(false);

    const onChange = (e: any) => {
        const data: any = ticket;
        data[e.target.name] = e.target.value;
        setTicket(data);
    };

    const getTickets = async () => {
        try {
            const response = await axios.get<any>(`${process.env.NEXT_PUBLIC_API_REST_URL}/get`);
            if (response.data) {
                setTickets(response.data);
            }
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    };

    const createTicket = async () => {
        try {
            await axios.post<any>(`${process.env.NEXT_PUBLIC_API_REST_URL}/post`, ticket, headers);
            getTickets();
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    };
    

    const deleteTicket = async (number: number) => {
        try {
            await axios.delete<any>(`${process.env.NEXT_PUBLIC_API_REST_URL}/delete/${number}`,);
            getTickets();
        } catch (error) {
            alert(`Hubo un error al realizar la peticion: ${error}`);
        }
    };


    return (
        <div>
            <center>
               <h1>Cafetería Doña Tere</h1>
            <div>
                <label htmlFor="name">Ingresa el nombre del ticket:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='name'
                    placeholder='Nombre'
                /><br/>
                <label htmlFor="date">Ingresa la fecha del ticket:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='date'
                    placeholder='Fecha'
                /><br/>
                <label htmlFor="time">Ingresa la hora del ticket:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='time'
                    placeholder='Hora'
                /><br/>
                <label htmlFor="food">Ingresa la comida del ticket:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='food'
                    placeholder='Comida'
                /><br/>
                <label htmlFor="price">Ingresa el precio del producto</label><br />
                <input 
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='price'
                    placeholder='Precio ($)' 
                /><br />
                <label htmlFor="description">Ingresa la descripción del ticket:</label><br />
                <input
                    type="text"
                    onChange={(e) => onChange(e)}
                    name='description'
                    placeholder='Descripción'
                /><br/>
            </div>
            <button onClick={createTicket}>Agregar ticket</button> 
            <br />
            </center>
            
            <center>
                <table>
                {tickets.map((ticket, index) => (
                    <tr key={index}>
                        <td id='columna-1'>
                        <p>Nombre: &nbsp;</p>
                        {ticket.name}<br></br>
                        Numero:&nbsp;
                        {ticket.number}<br></br>
                        Fecha: &nbsp;
                        {ticket.date}<br></br>
                        Hora:&nbsp; 
                        {ticket.time}<br></br>
                        Comida: &nbsp; 
                        {ticket.food}<br></br>
                        Precio: &nbsp; 
                        {ticket.price}<br></br>
                        Notas: &nbsp; 
                        {ticket.description}<br/>
                        <button onClick={() => deleteTicket(ticket.number)}>Borrar</button>
                        <br />
                        </td>
                    </tr>
                ))}
            </table>

            </center>
        </div>
    );
}