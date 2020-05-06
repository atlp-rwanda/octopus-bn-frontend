import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
// A custom theme for this app
export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Trebuchet MS", sans-serif',
  },
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#fff",
    },
  },
});

export const LabelTheme = createMuiTheme({
	overrides: {
	  MuiInputLabel: { 
		root: { 
		  color: "black",
		  "&$focused": { // increase the specificity for the pseudo class
			color: "black"
		  }
		}
	  }
	}
  });