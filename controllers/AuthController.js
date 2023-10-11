const User = require("../models/User");
// Criptorafar a senha
const bcrypt = require("bcryptjs");

module.exports = class AuthController {
  static async login(request, response) {
    return response.render("auth/login");
  }

  static async register(request, response) {
    return response.render("auth/register");
  }
  static async registerPost(request, response) {
    const { name, email, password, confirmpassword } = request.body;

    if (password != confirmpassword) {
      request.flash("message", "As senhas não são iguais, tente novamente");
      return response.render("auth/register");
    }

    // verificar se o email ja está cadastrado
    const checkUserExist = await User.findOne({where: {email:email}})
    if(checkUserExist){
      request.flash("message", "O email já está em uso!");
      response.render("auth/register");
      return
    }

    // Criptografar a senha do usuario
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    // criar o objeto do usuario para o banco:
    const user = {
      name,
      email,
      password: hashedPassword,
    }

    // try: inserir usuario no banco e trabalhara com sessão
    try {

    const createUser =  await User.create(user)

     request.session.userId = createUser.id

      request.flash('message', 'Cadastro realizado com sucesso!')

      request.session.save(()=>{
        response.redirect('/')
      })


    } catch (error) {
      console.log(error)

    }
  }

   static async logout(request, response){
    request.session.destroy()
    response.redirect('/login')
   }
   
};
