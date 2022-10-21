import React, { Component } from 'react'
import CompteService from '../../services/CompteService'

class ListCompteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                Comptes: []
        }
        this.addCompte = this.addCompte.bind(this);
        this.editCompte = this.editCompte.bind(this);
        this.deleteCompte = this.deleteCompte.bind(this);
    }

    deleteCompte(id){
        CompteService.deleteCompte(id).then( res => {
            this.setState({Comptes: this.state.Comptes.filter(Compte => Compte.rib !== id)});
        });
    }
    viewCompte(id){
        this.props.history.push(`/view-Compte/${id}`);
    }
    editCompte(id){
        this.props.history.push(`/add-Compte/${id}`);
    }

    componentDidMount(){
        CompteService.getComptes().then((res) => {
            this.setState({ Comptes: res.data});
        });
    }

    addCompte(){
        this.props.history.push('/add-Compte/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Comptes</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCompte}> Add Compte</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> rib  </th>
                                    <th> solde</th>
                                    <th> client </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Comptes.map(
                                        Compte => 
                                        <tr key = {Compte.rib}>
                                             <td> {Compte.rib} </td>
                                             <td> {Compte.solde} </td>   
                                             <td> {Compte.client.cin}</td>
                                             
                                             <td>
                                                 <button onClick={ () => this.editCompte(Compte.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCompte(Compte.rib)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCompte(Compte.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListCompteComponent
