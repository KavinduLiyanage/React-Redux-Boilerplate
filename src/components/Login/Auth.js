//All the security authentication contains here
const User_EMAIL = "kavindu@orelit.com";
const User_PASSWORD = "1234";
const TOKEN_EMAIL = "";


//Login validation
export const login = (email, password) => {
    if ((User_EMAIL===email) && (User_PASSWORD===password)) {
        try {
            //Check token is valid in this try catch block.
            //If this fails user will be not loged on

            localStorage.setItem(TOKEN_EMAIL, email);

        } catch (e) {
            console.log("Token Not Valid");
        }
    }
    else
        alert("Please Check Email & Password");
};

//Remove all the configuration in localStorage after log out
export const logout = () => {

    localStorage.removeItem(TOKEN_EMAIL);

};

//Check user is login every time running a private route
export const isLogin = () => {
   return !!localStorage.getItem(TOKEN_EMAIL);
};


