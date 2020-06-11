import {StepConnector, withStyles, makeStyles, Dialog} from '@material-ui/core'

export const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);


  export const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);

  export const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
  });

  
  export const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#784af4',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
  });


  export const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(3),

    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    deleteIcon: {
      float: 'right',
      marginBottom: '10px'
    }
  }));


  export const modalStyles = makeStyles({

    listItem: {
      position: "sticky",
      marginBottom: "30px",
      top: "0px",
      backgroundColor: "#000",
    }, 
    listItemText: {
      color: "#fff"
    },
    addIcon: {
      cursor: 'pointer',
    },
    
    dialogActions: {
      marginTop: '50px',
    },

  deleteOption: {
      float: "right",
      marginRight: "30px",
    },
    deleteIcon: {
      cursor: "pointer"
    },
  })

   
  