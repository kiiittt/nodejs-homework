// index.js
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const argv = yargs(hideBin(process.argv))
  .command({
    command: "list",
    describe: "List all contacts",
    handler: () => {
      listContacts()
        .then((contacts) => {
          console.log("Список контактів:");
          console.table(contacts);
        })
        .catch((error) => {
          console.error("Помилка при отриманні списку контактів:", error);
        });
    },
  })
  .command({
    command: "get <id>",
    describe: "Get contact by id",
    builder: (yargs) => {
      return yargs.positional("id", {
        describe: "Contact id",
        type: "string",
      });
    },
    handler: (argv) => {
      getContactById(argv.id)
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
    },
  })
  .command({
    command: "add",
    describe: "Add a new contact",
    builder: (yargs) => {
      return yargs
        .option("name", {
          alias: "n",
          describe: "Contact name",
          demandOption: true,
          type: "string",
        })
        .option("email", {
          alias: "e",
          describe: "Contact email",
          demandOption: true,
          type: "string",
        })
        .option("phone", {
          alias: "p",
          describe: "Contact phone",
          demandOption: true,
          type: "string",
        });
    },
    handler: (argv) => {
      addContact(argv.name, argv.email, argv.phone)
        .then((addedContact) => {
          console.log("Доданий новий контакт:");
          console.log(addedContact);
        })
        .catch((error) => {
          console.error("Помилка при додаванні нового контакту:", error);
        });
    },
  })
  .command({
    command: "remove <id>",
    describe: "Remove contact by id",
    builder: (yargs) => {
      return yargs.positional("id", {
        describe: "Contact id",
        type: "string",
      });
    },
    handler: (argv) => {
      removeContact(argv.id)
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
    },
  })
  .demandCommand(1, "You need at least one command before moving on")
  .strict()
  .help()
  .alias("h", "help").argv;
