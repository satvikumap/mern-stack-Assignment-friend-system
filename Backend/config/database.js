const mongoose = require("mongoose")


exports.connect = () => {
	mongoose
		.connect("mongodb+srv://admin:satvik@cluster0.lw0dgjg.mongodb.net/friendSystem")
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};