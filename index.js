// index.js
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const main = async () => {
  const argv = yargs(hideBin(process.argv))
    .command({
      command: "list",
      describe: "List all contacts",
      handler: async () => {
        try {
          const contacts = await listContacts();
          console.log("Список контактів:");
          console.table(contacts);
        } catch (error) {
          console.error("Помилка при отриманні списку контактів:", error);
        }
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
      handler: async (argv) => {
        try {
          const contact = await getContactById(argv.id);
          console.log("getContactById result:", contact); 
          if (contact) {
            console.log("Знайдений контакт:");
            console.log(contact);
          } else {
            console.log("Контакт не знайдений");
          }
        } catch (error) {
          console.error("Помилка при отриманні контакту за id:", error);
        }
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
      handler: async (argv) => {
        try {
          const addedContact = await addContact(
            argv.name,
            argv.email,
            argv.phone
          );
          console.log("Доданий новий контакт:");
          console.log(addedContact);
        } catch (error) {
          console.error("Помилка при додаванні нового контакту:", error);
        }
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
      handler: async (argv) => {
        try {
          const removedContact = await removeContact(argv.id);
          console.log("removeContact result:", removedContact); // Добавлено логирование
          if (removedContact) {
            console.log("Видалений контакт:");
            console.log(removedContact);
          } else {
            console.log("Контакт не знайдений, не можна видалити");
          }
        } catch (error) {
          console.error("Помилка при видаленні контакту за id:", error);
        }
      },
    })
    .demandCommand(1, "You need at least one command before moving on")
    .strict()
    .help()
    .alias("h", "help").argv;
};

main();
