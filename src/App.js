import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import Login from "./Login";

import DATA from './data.json';
import './assets/styles/style.css'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searchValue: '',
            selectValue: '',
            modalValue: '',
            checked: false,
            showModal: false,
            data: DATA.data,
            indexChange: 0
        }
    }

    onEdit = (index) => {
        let arr = this.state.data;
        this.setState({
            showModal: true,
            indexChange: index,
            modalValue: arr[index].title,
        })
    }
    onChangeTitle = () => {
        let arr = this.state.data;
        arr[this.state.indexChange].title = this.state.modalValue

        this.setState({
            showModal: false,
            modalValue: '',

        })
    }
    onCancel = () => {
        this.setState({
            showModal: false,
            modalValue: '',

        })
    }
    modalChange = (ev) => {
        this.setState({
            modalValue: ev.target.value,
        })
    }
    onDelete = (index) => {
        let arr = this.state.data;
        arr.splice(index, 1)
        this.setState({data: arr})
    }
    addItem = () => {
        let arr = this.state.data;
        let str = this.state.value
        if(str === ''){
            alert('Empty Value')
        }
        arr.push({
            id: arr[arr.length - 1].id + 1,
            "title": str,
        })
        this.setState({
            value: '',
            data: arr
        })
    }
    onSearch = (ev) => {
        this.setState({searchValue: ev.target.value})
    }
    getSelectVAl = (ev) => {
        console.log(ev.target.value)
        this.setState({selectValue: ev.target.value})
    }
    getInputVal = (ev) => {
        this.setState({value: ev.target.value})
    }

    render() {

        const {value,selectValue, showModal,searchValue, modalValue, data} = this.state;
        return (
            <div>

                <Login/>

                <form className='add-form' action="#" method='GET'>
                    <input value={value} type="text" placeholder='text' onChange={this.getInputVal}/>
                    <button onClick={this.addItem}>Add</button>
                </form>
                <input value={searchValue} onChange={this.onSearch} type="text" placeholder='Search'/>
                <select onChange={this.getSelectVAl} value={selectValue} name="Completed" id="select-comp">
                    <option value="">--------</option>
                    <option value="true">Completed</option>
                    <option value="false">No Completed</option>
                </select>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Action</th>
                        <th>Rename</th>
                    </tr>


                    {data.filter(val =>{
                        if(selectValue === ''){
                            return val;
                        }else if(selectValue === 'true' ){
                            return val.completed === true;
                        }else if(selectValue === 'false' ){
                            return val.completed === false;
                        }
                    }).filter(val =>{
                        if(searchValue === ''){
                           return val;
                        }else if( val.title.toLowerCase().includes(searchValue.toLowerCase())){
                            return val;
                        }
                    }).map((item, index) => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.completed === true ? <span className='green'>Completed</span>:<span className='red'>No Completed</span>}</td>
                            <td>
                                <button className='del-btn' onClick={() => this.onDelete(index)}>Delete</button>
                            </td>
                            <td>
                                <button onClick={() => this.onEdit(index)}>Edit</button>
                            </td>
                        </tr>

                    })}
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
                {showModal ? <div className='modal'>
                    <h2>Edit Title</h2>
                    <textarea onChange={this.modalChange} value={modalValue} id="modal-input"/>
                    <div className='btn-block'>
                        <button onClick={this.onCancel} className='cancel-btn'>Cancel</button>
                        <button onClick={this.onChangeTitle} className='change-btn'>Change</button>
                    </div>
                </div> : null}

            </div>
        );
    }
}

export default App;
