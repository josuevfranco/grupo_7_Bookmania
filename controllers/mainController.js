const mainController = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    login: (req, res) => {
        return res.render('users/login');
    },
    
}
module.exports = mainController;