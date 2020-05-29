import React, {Component} from 'react';
import queryString from 'query-string';
import {decode} from '../utils/tokenDecoder';
import { connect } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { LinearProgress } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import PublishIcon from '@material-ui/icons/Publish';
import ViewEditProfile from '../views/ViewEditProfile';
import classes from '../styles/Profile.module.css';
import {updateProfile} from '../redux/actions/profileActions';
import convertDate from '../utils/DateConverter';
import translate from '../languages/translate';
import LanguageButtons from './LanguageButtons';
import { Redirect } from 'react-router-dom';
import Avatar from '../assests/bn-avatar.jpg';
import { setLocale } from '../redux/actions/languageAction';
class Profile extends Component {
constructor(props){
  super(props);
  this.state = {
    user:{
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: new Date(),
      preferedLang:'',
      preferedCurrency: '',
      residence: '',
      department: '',
      imageUrl: '',
      bio: '',
      passportNumber: ''
    },
    userEmail:'',
    redirect: false,
    ProfileUpdated: false,
    profileDefaults:{},
    isImageUploaded: true,
    errors: {},
    open: false,
    profileWidget: cloudinary.createUploadWidget(
      {
        cloudName: 'octopusbn',
        uploadPreset: 'barefootNomadCloud',
        multiple: false,
        cropping: true,
        croppingShowBackButton: true
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const user = { ...this.state.user };
          user.imageUrl = result.info.secure_url;
          this.setState({ user });
          this.setState({...this.state, isImageUploaded:true})
        }
      }
    ),
  };
  this.handleChange = this.handleChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}
  onSubmit = (e) =>{
    e.preventDefault();
    const errors = this.validateHandler(this.state.user);
    this.setState({ errors });
     console.log(errors);
    if (Object.keys(errors).length === 0) {
      console.log(this.state);
      this.setState({...this.state, open: true});
      this.props.updateProfile(this.state.user);
      this.props.setLocale(this.state.user.preferedLang);
    }
  }
  showWidget = () => {
    this.state.profileWidget.open();
  };

  handleChange = (e) =>
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
    });
    handleDateChange = (e, date) => {
     this.setState({
      user: { ...this.state.user, birthDate: convertDate(e) },
    });
    }
  validateHandler = (request) => {
    const errors = {};
    if(!request.firstName){
      errors.firstName = translate('LastNameRequired');
      errors.firstNameErrorStatus = true;
    }
    if(!request.lastName){
      errors.lastName = translate('LastNameRequired');
      errors.lastNameErrorStatus = true;
    }
    if(!request.passportNumber){
      errors.passportNumber = translate('PassportNumberRequired');
      errors.passportNumberErrorStatus = true;
    }
    if(!request.department){
      errors.department = translate('DepartmentRequired');
    }
    if(!request.preferedCurrency){
      errors.preferedCurrency = translate('PreferedCurrencyRequired');
    }
    if(!request.bio){
      errors.bio = translate('bioRequired');
      errors.bioErrorStatus = true;
    }
    if(!request.gender){
      errors.gender = translate('genderRequired');
    }
    if(!request.preferedLang){
      errors.preferedLang = translate('preferedLangRequired');
    }
    if(!request.residence){
      errors.residence = translate('ResidenceRequired');
      errors.residenceErrorStatus = true;
    }

    return errors;
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
componentDidMount(){
  const {update} = queryString.parse(this.props.location.search);
  const token = localStorage.getItem('bn-token');
  if(!(update||token)){
    this.setState({...this.state, redirect: true});
  }
  const populatedData = update?decode(update):decode(token);
  const localData = JSON.parse(localStorage.getItem('bn-user-data'));
  if(populatedData){
    update?localStorage.setItem('bn-token', update): localStorage.setItem('bn-token', token);
    const {
      firstName,
      lastName,
      residence,
      bio,
      passportNumber,
      gender,
      birthDate,
      preferedLang,
      preferedCurrency,
      department,
      imageUrl,
      email
    } = populatedData;
    const user = { ...this.state.user };
    user.firstName = firstName || localData.firstName
    user.lastName = lastName || localData.lastName
    user.residence = residence||user.residence
    user.bio = bio||user.bio
    user.passportNumber = passportNumber||user.passportNumber
    user.gender = gender|| user.gender
    user.birthDate = birthDate||user.birthDate
    user.preferedLang = preferedLang||user.preferedLang
    user.preferedCurrency = preferedCurrency||user.preferedCurrency
    user.department = department||user.department
    user.imageUrl = imageUrl|| user.imageUrl
    this.setState({ user });
    this.setState({userEmail: email})
  }
}

UNSAFE_componentWillReceiveProps(nextProps){
 this.setState({ProfileUpdated: nextProps.isUpdated});
}
   render(){
       if(this.state.redirect){
        return <Redirect to='/'/>
       }
       
       if(this.state.ProfileUpdated){
        return <Redirect to='/dashboard'/>
       }
       return(
         <div>
            <ViewEditProfile/>
             
             {this.props.loading? 
             <div style={{ display: "block" }}><LinearProgress /></div>:
             <div style={{ display: "none" }}><LinearProgress /></div>
             }
            <LanguageButtons /> 
          <div className={classes.LeftForm}>
             <div className={classes.Wrap}>
               <div className={classes.FormTopText}>
                <p className={classes.ActionTitle}>{translate('update-profile')}</p>
                  <p className={classes.ActionSubtitle}>{translate('hi')} {this.state.user.lastName}, {translate('welcome')}</p>      
                </div>

<div className={classes.ProfileHolder}>

<div className={classes.ProfileLeft}>
   <div className={classes.Center}>
     <div className={classes.PictureContainer}>
       <img className={classes.ProfilePicture} 
        src={this.state.user.imageUrl||Avatar} alt="Profile picture"/>
    </div>
   </div>
</div>

<div className={classes.ProfileRight}>
    <p><strong>{translate('YourEmail')}: </strong>{this.state.userEmail}</p>
    <Button variant="contained"
      style={{ marginTop: "10px" }}
      color="primary" component="span"
      onClick={this.showWidget}
      startIcon={<PublishIcon />}>
       {translate('ChangePicture')}
      </Button>
</div>
</div>



            <form className={classes.Form} aria-label="form">
              <div>
              <TextField
                required
                className={classes.Input}
                required
                label={translate('firstName')}
                name="firstName"
                value={this.state.user.firstName}
                variant="outlined"
                onChange={this.handleChange}
                error={this.state.errors.firstNameErrorStatus}
                helperText={this.state.errors.firstName}/>
              <TextField
                required
                className={classes.Input}
                style={{ marginTop: "20px" }}
                label={translate('LastName')}
                name="lastName"
                value={this.state.user.lastName}
                error={this.state.errors.lastNameErrorStatus}
                helperText={this.state.errors.lastName}
                onChange={this.handleChange}
                variant="outlined"/>
              <TextField
                required
                className={classes.Input}
                style={{ marginTop: "20px" }}
                label={translate('PassportNumber')}
                name="passportNumber"
                value={this.state.user.passportNumber}
                error={this.state.errors.passportNumberErrorStatus}
                helperText={this.state.errors.passportNumber}
                onChange={this.handleChange}
                variant="outlined"/>
              <FormControl variant="outlined" className={classes.Input}
              style={{ marginTop: "20px" }}>
              <InputLabel
               htmlFor="filled-department-native-simple">{translate('department')}</InputLabel> 
              <Select
               required
               native
               value={this.state.user.department}
               name="department"
               label={translate('department')}
               inputProps={{
                name: 'department',
                id: 'filled-department-native-simple',
              }}
              
               onChange={this.handleChange}>
             <option aria-label="None" value="" />
             <option value="IT">IT</option>
             <option value="Accounting">Accounting</option>
             <option value="Logistics">Logistics</option>
           </Select>
           <FormHelperText style={{color: "red"}}>{this.state.errors.department}</FormHelperText>
           </FormControl> 
           <FormControl variant="outlined" className={classes.Input}
             style={{ marginTop: "20px" }}>
              <InputLabel
               htmlFor="filled-currency-native-simple">{translate('PreferredCurrency')}</InputLabel> 
              <Select
               required
               native
               value={this.state.user.preferedCurrency}
               name="preferedCurrency"
               label={translate('PreferredCurrency')}
               inputProps={{
                name: 'preferedCurrency',
                id: 'filled-currency-native-simple',
              }}
               onChange={this.handleChange}>
             <option aria-label="None" value="" />
             <option value="USD">USD</option>
             <option value="RWF">RWF</option>
             <option value="EURO">EURO</option>
           </Select>
           <FormHelperText style={{color: "red"}}>{this.state.errors.preferedCurrency}</FormHelperText>
           </FormControl> 
           <MuiPickersUtilsProvider 
           utils={DateFnsUtils}>
          <DatePicker
            style={{ marginTop: "20px" }}
            className={classes.Input}
            disableFuture
            openTo="year"
            format="MM-dd-yyyy"
            label={translate('DateOfBirth')}
            views={["year", "month", "date"]}
            value={this.state.user.birthDate}
            onChange={this.handleDateChange}/>
          </MuiPickersUtilsProvider>
              </div>
              <div>
              <TextField
               className={classes.Input}
               required
               multiline={true}
               rows={4}
               name="bio"
               value= {this.state.user.bio}
               label={translate('bio')}
               error={this.state.errors.bioErrorStatus}
               helperText={this.state.errors.bio}
               autoComplete="off"
               variant="outlined"
               onChange={this.handleChange}
               />

             <FormControl variant="outlined" className={classes.Input}
              style={{ marginTop: "20px" }}
              >
              <InputLabel htmlFor="filled-gender-native-simple">{translate('Gender')}</InputLabel> 
              <Select
               native
               value={this.state.user.gender}
               name="gender"
               label = {translate('Gender')}
               inputProps={{
                name: 'gender',
                id: 'filled-gender-native-simple',
              }}
               onChange={this.handleChange}>
             <option aria-label="None" value="" />
             <option value="male">Male</option>
             <option value= "female">Female</option>
             <option value= "other">Other</option>
           </Select>
           <FormHelperText style={{color: "red"}}>{this.state.errors.gender}</FormHelperText>
           </FormControl> 

           <FormControl variant="outlined" className={classes.Input}
            style={{ marginTop: "20px" }}>
              <InputLabel
               htmlFor="filled-lang-native-simple">{translate('PreferredLanguage')}</InputLabel> 
              <Select
               required
               native
               value={this.state.user.preferedLang}
               name ="preferedLang"
               label={translate('PreferredLanguage')}
               inputProps={{
                name: 'preferedLang',
                id: 'filled-lang-native-simple',
              }}
               onChange={this.handleChange}>
             <option aria-label="None" value="" />
             <option value="en">English</option>
             <option value="fr">French</option>
           </Select>
           <FormHelperText style={{color: "red"}}>{this.state.errors.preferedLang}</FormHelperText>
           </FormControl> 
           
               <TextField
                required
                style={{ marginTop: "20px" }}
                className={classes.Input}
                required
                value= {this.state.user.residence}
                label={translate('Residence')}
                name="residence"
                error={this.state.errors.residenceErrorStatus}
                helperText={this.state.errors.residence}
                variant="outlined"
                onChange={this.handleChange}/>

         
              <Button
                type="submit"
                aria-label="submit"
                variant="contained"
                color="primary"
                onClick={this.onSubmit}
                style={{
                  float: "right",
                  marginTop: "10px",
                  textTransform: "capitalize",
                  width: "120px",
                  height:"40px"
                }}
                disableElevation>
                {translate('Update')}
              </Button>
              </div>

            </form>
          </div>
        </div>
        {
        this.props.loading?<></>:
        <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
      message={<span id="message-id">
        {this.props.error?this.props.error.message:this.props.message}
        {this.props.isUpdated?localStorage.setItem('bn-token', this.props.token):null}
        {this.props.isUpdated?localStorage.setItem('bn-user-data', JSON.stringify(this.props.data)):null}
        
      </span>}
        action={[
          <IconButton 
          key="close" 
          aria-label="Close" 
          color="inherit"
          onClick={() => this.setState({ open: false })}>
          <CloseIcon />
          </IconButton>,
        ]}/>
       }
    </div>
    );
   }
}
const mapStateToProps = state => {
  return{
      loading: state.profile.loading,
      error: state.profile.error,
      message: state.profile.message,
      isUpdated: state.profile.isUpdated,
      token: state.profile.token,
      data: state.profile.data
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateProfile : (payload) => dispatch(updateProfile(payload)),
    setLocale : (locale) => dispatch(setLocale(locale))
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Profile);