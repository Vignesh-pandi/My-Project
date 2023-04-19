const { MongoClient } = require("mongodb");

module.exports = {
  myDatabase: {},
  async connect() {
    try {
      const client = await MongoClient.connect("mongodb+srv://Ajeesmd1327:ELVOmnR1yDdV55tg@cluster0.pt6dtup.mongodb.net/?retryWrites=true&w=majority");
      this.selectedDb = client.db("user");
      console.log("connscted")
    } catch (error) {
      console.log("eoore",error);
    }
  },
};
