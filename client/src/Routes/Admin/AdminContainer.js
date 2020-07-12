import User from "../../Components/User";
import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: "auto"
    },
    table: {
      minWidth: 1080
    }
  })

const users = [
  {
    image: "https://placeimg.com/64/64/any",
    email: "hong@naver.com",
    name: "홍길동",
  },
  {
    image: "https://placeimg.com/64/64/any",
    email: "lee@naver.com",
    name: "이길동",
  },
  {
    image: "https://placeimg.com/64/64/any",
    email: "choi@naver.com",
    name: "최길동",
  },
];

class AdminContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>이미지</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>이름</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => { return ( <User image={user.image} email={user.email} name={user.name} /> ); }) }
          </TableBody>
        </Table>
      </Paper>        
    );
  }
}

export default withStyles(styles)(AdminContainer);
