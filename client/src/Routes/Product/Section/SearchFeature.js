import React, { useState } from "react"
// import { Input } from "antd";
import Input from "@material-ui/core/Input"
import { makeStyles } from "@material-ui/core/styles"
// const { Search } = Input;
const useStyles = makeStyles({
  root: {
    // background:
    border: "1px solid gray",

    borderRadius: 1,
    color: "white",
    height: 40,
    padding: "0 20px",
  },
})

function SearchFeature(props) {
  const classes = useStyles()
  const [SearchTerm, setSearchTerm] = useState("")
  const searchHandler = (event) => {
    console.log("@22", event.target.value)
    setSearchTerm(event.target.value)
    props.refreshFunction(event.target.value)
  }
  return (
    <div>
      {/* <Search onChange={searchHandler} value={SearchTerm}
        placeholder="상품을 검색해주세요"
        onChange={searchHandler}
        style={{ width: 200, marginTop:"10px", }}
        value={SearchTerm}
        noValidate autoComplate="off"
      /> */}
      <Input
        type="text"
        className={classes.root}
        value={SearchTerm}
        onChange={searchHandler}
        placeholder="상품을 검색해주세요"
      />
    </div>
  )
}

export default SearchFeature
