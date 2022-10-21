import axios from 'axios';

const Compte_API_BASE_URL = "http://localhost:8080/comptes";

class CompteService {

    getComptes(){
        return axios.get(Compte_API_BASE_URL + "/all-comptes");
    }

    createCompte(Compte){
        return axios.post(Compte_API_BASE_URL + '/savecompte', Compte);
    }

    getCompteById(CompteId){
        return axios.get(Compte_API_BASE_URL + '/' + CompteId);
    }

    updateCompte(Compte, CompteId){
        return axios.put(Compte_API_BASE_URL + '/' + CompteId, Compte);
    }

    deleteCompte(CompteId){
        return axios.delete(Compte_API_BASE_URL + '/' + CompteId);
    }
}

export default new CompteService()