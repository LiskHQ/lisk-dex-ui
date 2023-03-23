export const checkTokenNameValue = (token:string) => {
    if (token == null || token == "") {
      return "Select Token";
    } else {
      return token;
    }
  };