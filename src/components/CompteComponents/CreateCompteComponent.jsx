import React, { Component } from 'react'
import CompteService from '../../services/CompteService';

class CreateCompteComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            rib: null,
            solde: null,
            client: {
                "cin": "",
                "nom": "",
                "prenom": ""
            }
        }
        this.changeCinHandler = this.changeCinHandler.bind(this);
        this.changeSoldeHandler = this.changeSoldeHandler.bind(this);
        this.saveOrUpdateCompte = this.saveOrUpdateCompte.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            CompteService.getCompteById(this.state.id).then( (res) =>{
                let compte = res.data;
                this.setState({cin: compte.cin,
                   
                });
            });
        }        
    }

    saveOrUpdateCompte = (e) => {
        e.preventDefault();
        let compte = {rib: this.state.rib, solde: this.state.solde, client: this.state.client};
        console.log('compte => ' + JSON.stringify(compte));

        // step 5
        if(this.state.id === '_add'){
            CompteService.createCompte(compte).then(res =>{
                this.props.history.push('/comptes');
            });
        }else{
            CompteService.updateCompte(compte, this.state.id).then( res => {
                this.props.history.push('/comptes');
            });
        }
    }
    
    changeCinHandler= (event) => {
        let compte = {rib: this.state.rib, solde: this.state.solde, client: this.state.client};
        this.setState({client: {cin : event.target.value}});
    }

    changeSoldeHandler= (event) => {
        this.setState({solde: event.target.value});
    }



    cancel(){
        this.props.history.push('/comptes');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Compte</h3>
        }else{
            return <h3 className="text-center">Update Compte</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Cin: </label>
                                            <input placeholder="cin" name="cin" className="form-control" 
                                                value={this.state.cin} onChange={this.changeCinHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Solde: </label>
                                            <input placeholder="Nom" name="nom" className="form-control" 
                                                value={this.state.nom} onChange={this.changeSoldeHandler}/>
                                        </div>
                                        

                                        <button className="btn btn-success" onClick={this.saveOrUpdateCompte}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateCompteComponent
