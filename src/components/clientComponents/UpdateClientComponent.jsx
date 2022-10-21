import React, { Component } from 'react'
import ClientService from '../../services/ClientService';

class UpdateClientComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cinId: this.props.match.params.cinId,
            prenom: '',
            nom: '',
            cin: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.updateClient = this.updateClient.bind(this);
    }

    componentDidMount(){
        ClientService.getClientById(this.state.cinId).then( (res) =>{
            let client = res.data;
            this.setState({prenom: client.prenom,
                nom: client.nom,
                cin : client.cin
            });
        });
    }

    updateClient = (e) => {
        e.preventDefault();
        let client = {prenom: this.state.prenom, nom: this.state.nom, cin: this.state.cin};
        console.log('client => ' + JSON.stringify(client));
        console.log('cinId => ' + JSON.stringify(this.state.cinId));
        ClientService.updateClient(client, this.state.cinId).then( res => {
            this.props.history.push('/clients/all');
        });
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({prenom: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({nom: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({cin: event.target.value});
    }

    cancel(){
        this.props.history.push('/clients');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Client</h3>
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
                                            <label> Email </label>
                                            <input placeholder="Email Address" name="cin" className="form-control" 
                                                value={this.state.cin} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateClient}>Save</button>
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

export default UpdateClientComponent
