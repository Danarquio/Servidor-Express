import { Router } from "express";
import { cartsModel } from "../models/carts.model.js";

const router = Router()

//get
router.get("/", async(req,res)=> {
    try {
        let carts = await cartsModel.find()
        res.send({result : "success", payload:  carts})
    } catch(error){
        console.log(error)
        res.status(500).send({ status: "error", error: "Error al obtener carritos" })
    }
})

// post
router.post("/", async (req, res) => {
    if (!req.body) {
        res.status(400).send({ status: "error", error: "Solicitud sin cuerpo (body)" });
        return;
    }

    let { description, quantity, total } = req.body;
    if (!description || !quantity || !total) {
        res.status(400).send({ status: "error", error: "Faltan datos" });
        return;
    }

    try {
        let result = await cartsModel.create({ description, quantity, total });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Error al crear carrito" });
    }
});

// put
router.put("/:id_carts", async (req, res) => {
    if (!req.body) {
        res.status(400).send({ status: "error", error: "Solicitud sin cuerpo (body)" });
        return;
    }

    let { id_carts } = req.params;
    let cartsToReplace = req.body;
    if (!cartsToReplace.description || !cartsToReplace.quantity || !cartsToReplace.total) {
        res.status(400).send({ status: "error", error: "Faltan datos en parámetros" });
        return;
    }

    try {
        let result = await cartsModel.updateOne({ _id: id_carts }, cartsToReplace);
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Error al actualizar carrito" });
    }
});

// delete
router.delete("/:id_carts", async (req, res) => {
    let { id_carts } = req.params;
    try {
        let result = await cartsModel.deleteOne({ _id: id_carts });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error", error: "Error al eliminar carrito" });
    }
});

export default router;