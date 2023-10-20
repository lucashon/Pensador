const Tought = require('../models/Tought')
const User = require('../models/User')
const {Op} = require('sequelize')
const { query } = require('express')

module.exports = class ToughtController{

  static async showToughts(request, response){


    const query = `${request.query.search}`

   const search = await Tought.findAll({where: {title: {[Op.like]: query  }}})
    console.log(search)


    const toughtsData = await Tought.findAll({
      include: User,
    })

    const toughts = toughtsData.map((result)=> result.get({plain:true}))
    // console.log(toughts)
    return response.render('toughts/home', {toughts, search})
  }


  // Select com join SEQUELIZE
  static async dashboard(request,response){
    const userid = request.session.userId

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

      let emptyThoughts = false

    if(toughts.length === 0){
      emptyThoughts = true
    }

    return response.render('toughts/dashboard', {toughts,emptyThoughts })
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
  static async UpToughts(request,response){
    const id = request.params.id

    const toughtNew = await Tought.findOne({raw:true, where:{id:id}})
    console.log(toughtNew)
    return response.render('toughts/atualizar', {toughtNew})
  }

  static async UpdateToughts(request,response){

    const id = request.body.id
    const novo = {
      title:  request.body.title
    }

     await Tought.update(novo, { where: { id: id } })

    return response.redirect('/toughts/dashboard')
  }
}