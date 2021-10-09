// 1require express
const express = require ("express");
// 2express router
const router = express.Router()
//3 require model contact
const Contact = require('../models/Contact')
///////////////// Routes
/**
 * @desc :testing route
 *@path : http://localhost:9000/api/contacts/test
 *@method: GET
 *@data : no data
 */
router.get('/test', (req,res)=>{
    res.send('Hello world')
})
/**
 * @desc :add contact
 *@path : http://localhost:9000/api/contacts/
 *@method: POST
 *@data : req.body
 */
 router.post('/', async (req,res) => { 
     try{
        const{name, email, phone} = req.body
        //handling error
        if (!name || !email){
            res.status(400).send({msg:'Name & email are required!!!'})
        return
        }
        //handling errors:email unique
        const contact=await Contact.find({email})
        if (contact){
            res.status(400).send({msg:"Contact already exist", error})

        }
        const newContact = new Contact({
            name, 
            email,
            phone
        })
        await newContact.save()
       res.status(200).send({msg:"Contact added", newContact})
     }catch (error){
         res.status(400).send({msg:'can not add this contact', error})

     }
    } 
)
/**
 * @desc :get all contact
 *@path : http://localhost:9000/api/contacts/
 *@method: GET
 *@data : req.body
 */
router.get('/', async (req, res)=> {
    try{
        const listContacts =await Contact.find()
        res.status(200).send({msg:'this is the list of all contacts', listContacts})
    } catch(error){
        res.status(400).send({msg:'can not get all contact', error})

    }
})
/**
 * @desc :get one contact
 *@path : http://localhost:9000/api/contacts/:id
 *@method: GET
 *@data : req.params.id
 */
 router.get('/', async (req, res)=> {
    try{
        const contactToGet =await Contact.findOne({_id: req.params.id})
        res.status(200).send({msg:'I get the contact', contactToGet})
    } catch(error){
        res.status(400).send({msg:'can not get this contact', error})

    }
})
/**
 * @desc :delete contact
 *@path : http://localhost:9000/api/contacts/:_id
 *@method: DELETE
 *@data : req.params.id
 */
 router.delete('/:_id', async (req, res)=> {
    try{
        const{_id}=req.params
        const contactToDelete =await Contact.findOneAndDelete({_id})
        res.status(200).send({msg:'contact deleted'})
    } catch(error){
        res.status(400).send({msg:'can not delete this contact', error})

    }
})
/**
 * @desc :edit contact
 *@path : http://localhost:9000/api/contacts/:_id
 *@method: PUT
 *@data : req.params.id &req.body
 */
 router.put('/:_id', async (req, res)=> {
    try{
        const{_id}=req.params
        const result =await Contact.updateOne({_id}, {$set:{...req.body}})
        res.status(200).send({msg:'contact edited'})
    } catch(error){
        res.status(400).send({msg:'can not edit this contact', error})

    }
})
module.exports = router