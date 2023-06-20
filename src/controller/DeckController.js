import mydeck from '../models/Deck';
import mymodel from '../models/Course'


let getDeck = async (req,res) => {
    await mydeck.MyDeck.find({})

    .then(data => res.status(201).json(data))
}
let getDecks = async(req,res) => {
    const {userID} = req.params
    let user = await mymodel.MyModel.findOne({"_id":userID}).populate('deck')
    res.status(201).json({deck_of_user:user.deck})
}
// truyền owner qua param
let postDecks =async(req,res) => {
    const {userID} = req.params
    const newDeck = new mydeck.MyDeck(req.body)
    const user = await mymodel.MyModel.findOne({"_id":userID})
    newDeck.owner = user
    await newDeck.save()
    console.log("user",user)
    console.log("newdeck",newDeck)
    await mymodel.MyModel.updateOne({_id:userID},{$push:{deck:newDeck._id}})
    await mymodel.MyModel.find({_id:userID})
    .then ((data) => res.status(201).json(data))
}
// truyền owner qua body
let postDeck2 =async(req,res,next) => {
    // phải tạo newdeck để lưu vào collection deck thì mới có _id để gắn vào user
    const newDeck = new mydeck.MyDeck( req.body)
    await newDeck.save()

    await mymodel.MyModel.updateOne({_id:req.body.owner},{$push:{deck:newDeck._id}})
    //phải dùng findOne vì find sẽ trả ra 1 cái mảng
    let findeck = await mydeck.MyDeck.findOne({_id:newDeck._id}).populate('owner')
    res.status(201).json({info_onwer_of_thẻ_bài:findeck.owner}) 
}


module.exports ={
    getDeck,getDecks,postDecks,postDeck2
}