import axios from 'axios';
import {APIRootPath,host,serverAPIPort,APIPath} from '@fed-exam/config';

export type Ticket = {
    id: string,
    title: string;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}

export type ApiClient = {
    getTickets: () => Promise<Ticket[]>;
    cloneTicket: (ticket:Ticket) => Promise<number>;
    deleteTicket: (ticket:Ticket) =>Promise<number>
    addTicket : (ticketToSend:Ticket) => Promise<number> 

}


export const createApiClient = (): ApiClient => {
    return {
        getTickets: () => {
            return axios.get(APIRootPath).then((res) => res.data);
        },
        cloneTicket: (ticket:Ticket) =>{
                return(axios
                .post(`${host}:${serverAPIPort}${APIPath}`, {
                    addedTicket: ticket
                })
                .then(res => {
                    return res.status
                }))
        },
        deleteTicket: (ticket:Ticket) =>{
            return(axios
            .delete(`${host}:${serverAPIPort}${APIPath}`, {                         
                headers: {
                    Authorization: "auth"
                  },
                  data: {
                    deletedTicket: ticket
                  }
            })
            .then(res => {
                return res.status
            }))
    },
    addTicket: (ticketToSend:Ticket) =>{
        return(axios
        .post(`${host}:${serverAPIPort}${APIPath}`, {
            addedTicket:ticketToSend
            
        })
        .then(res => {
            return res.status
        }))
}
        

        
        
    }

}
