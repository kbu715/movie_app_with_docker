import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import Portlet from "./Portlet";
import PortletContent from "./PortletContent";
import styles from "./styles";
import {Button} from "antd";

class UserMovie extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
  };

  static defaultProps = {
    movies: [],
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, movies, removeItem } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);
    console.log("movies",movies)
    return (
      <Portlet className={rootClassName} style={{ backgroundColor: "#2D2D2D" }}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ color: "white" }}>
                  Poster
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Title
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Theater
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Seats
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Date
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Start At
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Ticket Price
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  Total
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  예매 취소
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(movie => (
                  <TableRow className={classes.tableRow} hover key={movie._id}>
                    <TableCell className={classes.tableCell}>
                        <a href={`/movie/${movie.id}`}>
                        <img
                        style={{ width: "70px" }}
                        alt="poster"
                        src={movie.poster}
                        />
                        </a>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {movie.title}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {movie.theater}관
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {movie.seat ? movie.seat
                      .sort()
                      .map((seat, index) => {
                    if (index < movie.seat.length - 1) {
                      return seat + ", ";
                    } else {
                      return seat;
                    }
                  }) : "not found"}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {movie.selectDay[0].day}/{movie.selectDay[0].month}/
                      {movie.selectDay[0].year}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {movie.time[0].time}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {movie.price}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {movie.continent}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      style={{ color: "#2d2d2d" }}
                    >
                      <Button 
                      type="primary"
                      style={{ backgroundColor:"#7b68ee", border:"#7b68ee" }}
                      onClick={() => removeItem(movie._id)}>
                        취소
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            style={{ color: "white" }}
            backIconButtonProps={{
              "aria-label": "Previous Page",
            }}
            component="div"
            count={movies.length}
            nextIconButtonProps={{
              "aria-label": "Next Page",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(UserMovie);
