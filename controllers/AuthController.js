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
      response.render("auth/register");
    }

    // verificar se o email ja está cadastrado

    // Criptografar a senha do usuario

    // criar o objeto do usuario para o banco

    // try: inserir usuario no banco e trabalhara com sessão
  }
};
