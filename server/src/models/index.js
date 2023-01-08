const { boomify } = require("boom");
const knex = require("../lib/knex");

exports.getUserTodos = async (table, userID) => {
    let response = await knex
        .from(table)
        .select()
        .where("user_id", "=", userID);
    return { todos: response };
};

exports.select = async (table, where) => {
    try {
        const query = knex(table).select().where(where).first();
        const result = await query;
        return result;
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.findOne = async (table, query, select = "*") => {
    let response = await knex.from(table).select(select).where(query).first();

    if (typeof response !== "undefined" && Object.keys(response).length > 0) {
        return response;
    } else {
        return false;
    }
};

exports.create = async (table, data) => {
    try {
        let response = await knex(table).insert(data);
        return response;
    } catch (err) {
        console.log("error in inserting: ", err);
        throw boomify(err);
    }
};

exports.update = async (table, query, data, select = "*") => {
    try {
        let response = await knex(table)
            .select(select)
            .where(query)
            .update(data);
    } catch (err) {
        console.log("error in update: ", err);
        throw boomify(err);
    }
};

exports.delete = async (table, query, select = "*") => {
    try {
        let response = await knex(table).select(select).where(query).delete();
    } catch (err) {
        console.log("error in delete: ", err);
        throw boomify(err);
    }
};
