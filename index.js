// const argv = require("yargs").argv;

const contactsOperations = require("./contacts");

// TODO: рефакторить
const invokeAction = async ({ action, id, data }) => {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    case "add":
      const newContact = await contactsOperations.addContact(data);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// invokeAction({ action: "list" });
// const id = "5";
// invokeAction({ action: "get", id });
// invokeAction(argv);

const newContact = {
  name: " Lucas Films",
  email: "nec1111111@Nulla.com",
  phone: "(111) 111-1111",
};

// invokeAction({ action: "add", data: newContact });
const removeById = "4400db8b-89e9-4b91-9c4c-13904d6bf24e";

invokeAction({ action: "remove", id: removeById });
