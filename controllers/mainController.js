const mainController = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    processRegister:(req, res)=>{
        return res.send("viniste por post");
    },

    login: (req, res) => {
        return res.render('users/login');
    },
    
}
module.exports = mainController;