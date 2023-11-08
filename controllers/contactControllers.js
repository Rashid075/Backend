const asyncHandler=require('express-async-handler');
const Contact=require('../models/contactmodels')

const getContacts=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find();
    res.status(200).json(contacts)
})

const createContact=asyncHandler(async(req,res)=>{
    console.log("The request body is:",req.body)
    const {name, email,phone}=req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All are Mandatory")
    }
    const crecontact=await Contact.create({
        name,email,phone
    })
    res.status(201).json(crecontact)
})

const getContact=asyncHandler(async(req,res)=>{
    const gcontact=await Contact.findById(req.params.id)
    if(!gcontact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    res.status(200).json(gcontact)
})

const updateContact=asyncHandler(async(req,res)=>{
    const ucontact=await Contact.findById(req.params.id)
    if(!ucontact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    const upcontact=await Contact.findByIdAndUpdate(req.params.id,req.body, {new:true})
    res.status(200).json(upcontact)
})

const deleteContact=asyncHandler(async(req,res)=>{
    const dcontact=await Contact.findById(req.params.id)
    if(!dcontact){
        res.status(404)
        throw new Error("Contact Not Found")
    }
    const delcontact=await Contact.remove()
    res.status(200).json(delcontact)
})

module.exports={getContacts,createContact, getContact, updateContact, deleteContact}
