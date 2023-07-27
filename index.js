const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 <command> [options]")
  .command("list", "List all contacts")
  .command("get <id>", "Get contact by id", (yargs) => {
    yargs.positional("id", {
      describe: "Contact id",
      type: "string",
    });
  })
  .command("add", "Add a new contact", (yargs) => {
    yargs.option("name", {
      alias: "n",
      describe: "Contact name",
      demandOption: true,
      type: "string",
    });
    yargs.option("email", {
      alias: "e",
      describe: "Contact email",
      demandOption: true,
      type: "string",
    });
    yargs.option("phone", {
      alias: "p",
      describe: "Contact phone",
      demandOption: true,
      type: "string",
    });
  })
  .command("remove <id>", "Remove contact by id", (yargs) => {
    yargs.positional("id", {
      describe: "Contact id",
      type: "string",
    });
  })
  .demandCommand(1, "You need at least one command before moving on")
  .strict()
  .help()
  .alias("h", "help").argv;

const { _, $0, ...args } = argv;

function invokeAction(action, args) {
  switch (action) {
    case "list":
      listContacts()
        .then((contacts) => {
          console.log("Список контактів:");
          console.log(contacts);
        })
        .catch((error) => {
          console.error("Помилка при отриманні списку контактів:", error);
        });
      break;

    case "get":
      getContactById(args.id)
        .then((contact) => {
          if (contact) {
            console.log("Знайдений контакт:");
            console.log(contact);
          } else {
            console.log("Контакт не знайдений");
          }
        })
        .catch((error) => {
          console.error("Помилка при отриманні контакту за id:", error);
        });
      break;

    case "add":
      addContact(args.name, args.email, args.phone)
        .then((addedContact) => {
          console.log("Доданий новий контакт:");
          console.log(addedContact);
        })
        .catch((error) => {
          console.error("Помилка при додаванні нового контакту:", error);
        });
      break;

    case "remove":
      removeContact(args.id)
        .then((removedContact) => {
          if (removedContact) {
            console.log("Видалений контакт:");
            console.log(removedContact);
          } else {
            console.log("Контакт не знайдений, не можна видалити");
          }
        })
        .catch((error) => {
          console.error("Помилка при видаленні контакту за id:", error);
        });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const action = _.shift();
invokeAction(action, args);
