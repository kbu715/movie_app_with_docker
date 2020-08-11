import { blueGrey } from "@material-ui/core/colors";

export default (theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  emailText: {
    marginTop: theme.spacing(1),
    color: blueGrey[600],
  },
  dateText: {
    color: blueGrey[600],
  },
  avatar: {
    marginLeft: "auto",
    height: "110px",
    width: "110px",
    flexShrink: 0,
    flexGrow: 0,
  },
  progressWrapper: {
    marginTop: theme.spacing(2),
  },
  input: { display: "none" },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
});
