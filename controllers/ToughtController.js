const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController{
  static async showToughts(request, response){
    return response.render('toughts/home')
  }
  static async dashboard(request,response){
    const userid = request.session.userId

    // Select com join SEQUELIZE
    const user = await User.findOne({
      where:{id:userid},
       include: Tought,
       plain:true
      })
      if(!user){
        response.redirect('/login');
      }
      // console.log(user.Toughts)
      const toughts = user.Toughts.map((result)=>result.dataValues)
      console.log(toughts)

    return response.render('toughts/dashboard', {toughts})
  }
  static async createTought(request,response){
    return response.render('toughts/create')
  }
  static async createToughtSave(request,response){
    const tought ={
      title: request.body.title,
      UserId: request.session.userId
    }

    try{
      await Tought.create(tought)
      request.flash('message', "Pensamento criade com sucesse")

      request.session.save(()=>{
        response.redirect('/toughts/dashboard')
      })
    }catch(error){
      console.log(error)
    }

  }

  static async deleteToughts(request,response){
    const id = request.body.id

    await Tought.destroy({where:{id:id}})
    return response.redirect('/toughts/dashboard')
  }
}