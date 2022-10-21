import React, { Component } from 'react'
import ClientService from '../../services/ClientService';

class CreateClientComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            cinId: this.props.match.params.cin,
            prenom: '',
            nom: '',
            cin: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateClient = this.saveOrUpdateClient.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.cinId === '_add'){
            return
        }else{
            ClientService.getClientById(this.state.cinId).then( (res) =>{
                let client = res.data;
                this.setState({prenom: client.prenom,
                    nom: client.nom,
                    cin : client.cin
                });
            });
        }        
    }
    saveOrUpdateClient = (e) => {
        e.preventDefault();
        let client = {prenom: this.state.prenom, nom: this.state.nom, cin: this.state.cin};
        console.log('client => ' + JSON.stringify(client));

        // step 5
        if(this.state.cinId === '_add'){
            ClientService.createClient(client).then(res =>{
                this.props.history.push('/clients/all');
            });
        }else{
            ClientService.updateClient(client, this.state.cinId).then( res => {
                this.props.history.push('/clients/all');
            });
        }
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({prenom: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({nom: event.target.value});
    }

    changeCinHandler= (event) => {
        this.setState({cin: event.target.value});
    }

    cancel(){
        this.props.history.push('/clients');
    }

    getTitle(){
        if(this.state.cinId === '_add'){
            return <h3 className="text-center">Add Client</h3>
        }else{
            return <h3 className="text-center">Update Client</h3>
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
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="prenom" className="form-control" 
                                                value={this.state.prenom} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="nom" className="form-control" 
                                                value={this.state.nom} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> CIN: </label>
                                            <input placeholder="Email Address" name="cin" className="form-control" 
                                                value={this.state.cin} onChange={this.changeCinHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateClient}>Save</button>
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

export default CreateClientComponent
