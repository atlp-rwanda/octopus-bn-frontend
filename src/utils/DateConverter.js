const convertDate = (str) => {
    let date = new Date(str),
    month = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [month,day, date.getFullYear()].join("-");
}

export default convertDate;
