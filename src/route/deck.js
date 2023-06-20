import express  from "express"
import DeckController from "../controller/DeckController"
import helper from "../helpers/routeHelper"

let router = express.Router()

let initWebDeck =(app) => {
    //  CRUD DESKS ================================================================================================
    
    router.get('/:userID/deck', helper.validateParam2(helper.module2,"userID"), DeckController.getDecks)
    router.post('/:userID/deck',helper.validateParam2(helper.module2,"userID"),
                                helper.validateBody(helper.module4),            DeckController.postDecks)
    router.post('/deck1',       helper.validateBody(helper.module4),            DeckController.postDeck2)
    router.get("/getDataDeck",                                                  DeckController.getDeck)

    app.use("/deck",router)
}

module.exports = initWebDeck