import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import UserDelete from './UserDelete';

class User extends Component {
    render() {
        return (
            <TableRow>
                <TableCell><img src={this.props.image} alt="profile" width="10px" height="10px" /></TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell><UserDelete stateRefresh={this.props.stateRefresh} email={this.props.email}/></TableCell>
            </TableRow>
        );
    }
}

export default User;