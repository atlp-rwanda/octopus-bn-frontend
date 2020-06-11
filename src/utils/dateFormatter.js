import moment from 'moment';
export const dateFormatter  = date =>{
     const formattedDate = moment(date).format("YYYY-MM-DD");
     return formattedDate;
}