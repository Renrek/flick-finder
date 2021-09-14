/**** MATERIAL UI ****/
import { createTheme } from "@material-ui/core";

/**** STYLING Colors ****/
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

/**** APP Theme ****/
const theme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: red[800],
      },
      background: {
        default: grey[500],
      },
    },
    props: {
      MuiPaper: {
        elevation: 12,
      }
    }
});

theme.props = {
    MuiPaper: {
        elevation: 12,
    }
}

theme.overrides = {
    MuiPaper: {
        root: {
           padding: 20,
           marginBottom: 20, 
        }
    }
}

export default theme;
    