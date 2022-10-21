import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/clients";

class ClientService {

    getClients(){
        return axios.get(EMPLOYEE_API_BASE_URL + "/all");
    }

    createClient(client){
        return axios.post(EMPLOYEE_API_BASE_URL, client);
    }

    getClientById(clientId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + clientId);
    }

    updateClient(client, clientId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/update/' /*+ clientId*/, client);
    }

    deleteClient(clientId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + clientId);
    }
}

export default new ClientService()