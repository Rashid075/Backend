const express=require('express')
const router=express.Router()
const {getContacts, getContact, updateContact, deleteContact}=require('../controllers/contactControllers')
const {createContact}=require('../controllers/contactControllers')

router.route("/").get(getContacts)

router.route("/").post(createContact)

router.route("/:id").get(getContact)

router.route("/:id").put(updateContact)

router.route("/:id").delete(deleteContact)


module.exports=router