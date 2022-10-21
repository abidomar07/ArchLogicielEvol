import React, { Component } from 'react'
import CompteService from '../../services/CompteService';
import ClientService from '../../services/ClientService';

import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import SelectField from '@material-ui/SelectField';

import Autocomplete from '@material-ui/lab/Autocomplete';

import VirtualizedSelect from 'react-virtualized-select'
import Select from 'react-select/';

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
            },
            cinList: [],
            selectedOption : null
        }
        this.changeCinHandler = this.changeCinHandler.bind(this);
        this.changeSoldeHandler = this.changeSoldeHandler.bind(this);
        this.saveOrUpdateCompte = this.saveOrUpdateCompte.bind(this);

        //this.handleRequestOptions = this.handleRequestOptions.bind(this);
    }
    onTextChange = (e,opt) => {
        const value = e.target.value;
        // eslint-disable-next-line no-unused-vars
        let newSuggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            newSuggestions = this.state.cinList.sort().filter(v => regex.test(v))
        }

        // this.setState(() => ({
        //     suggestions,
        //     text: value
        // }))
        this.setState({
            cinList: newSuggestions,
            text: value,selectedOption : opt
        })
    }

    selectedText(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions = () => {
        var suggestions = []
        suggestions = this.state.cinList;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{item}</li>))
                }
            </ul>
        );
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            ClientService.getClients().then((res) => {
                this.setState({ cinList: res.data.map(client => (client.cin)) });
            });
            return
        } else {
            CompteService.getCompteById(this.state.id).then((res) => {
                let compte = res.data;
                this.setState({
                    cin: compte.cin,

                });
            });
        }
    }
    // handleRequestOptions(part) {
    //     console.log(part);          // -> "ap", which is part after trigger "@"
    //     this.setState({ options: SOME_NEW_OPTION_ARRAY });
    //   }
    saveOrUpdateCompte = (e) => {
        e.preventDefault();
        let compte = { rib: this.state.rib, solde: this.state.solde, client: this.state.client };
        console.log('compte => ' + JSON.stringify(compte));

        // step 5
        if (this.state.id === '_add') {
            CompteService.createCompte(compte).then(res => {
                this.props.history.push('/comptes');
            });
        } else {
            CompteService.updateCompte(compte, this.state.id).then(res => {
                this.props.history.push('/comptes');
            });
        }
    }

    changeCinHandler = (event) => {
        let compte = { rib: this.state.rib, solde: this.state.solde, client: this.state.client };
        this.setState({ client: { cin: event.target.value } });
    }

    changeSoldeHandler = (event) => {
        this.setState({ solde: event.target.value });
    }



    cancel() {
        this.props.history.push('/comptes');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Compte</h3>
        } else {
            return <h3 className="text-center">Update Compte</h3>
        }
    }
    render() {
        const { text } = '';
        var suggestions
        suggestions = this.state.cinList;

        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Cin: </label>
                                        <input placeholder="cin" name="cin" className="form-control"
                                            value={this.state.cin} onChange={this.changeCinHandler} />


                                        <input id="query" type="text" onChange={this.onTextChange} value={text} />
                                        {this.renderSuggestions()}
                              

                                        {/* <Select
                                            options={this.state.cinList}
                                            value={selectedOption}
                                            onChange={(opt)=>{this.onTextChange(opt)}}
                                        /> */}



                                    </div>
                                    <div className="form-group">
                                        <label> Solde: </label>
                                        <input placeholder="Nom" name="nom" className="form-control"
                                            value={this.state.nom} onChange={this.changeSoldeHandler} />
                                    </div>



                                    <button className="btn btn-success" onClick={this.saveOrUpdateCompte}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
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
