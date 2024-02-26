import { program } from "commander"
import * as contactsService from "./contacts.js"

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone")

program.parse()
const options = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts()
      console.table(allContacts)
      break

    case "get":
      const receivedContact = await contactsService.getContactById(id)
      console.table(receivedContact)
      break

    case "add":
      const addedContact = await contactsService.addContact(name, email, phone)
      console.table(addedContact)
      break

    case "remove":
      const deletedContact = await contactsService.removeContact(id)
      console.table(deletedContact)

      break

    default:
      console.warn("\x1B[31m Unknown action type!")
  }
}

invokeAction(options)
