class BaseModel {
    constructor(model) {
        this.model = model
    }
    // ************ READ ************
    async findMany(cond, options = {}) {
        try {
            const { page = 1, limit = 20, sort = { createdAt: -1 }, opts = {}, select = '', populate = '' } = options;
            limit = parseInt(limit)
            page = parseInt(page)
            let skip = limit * (page - 1)
            const data = await this.model
                .find(cond, opts)
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .select(select)
                .populate(populate)
            if (data == null) {
                return []
            }
            return data
        } catch (error) {
            console.log(`findMany error = ${error}`)
            return null
        }
    }

    async findOne(cond, options = {}) {
        try {
            const { opts = {}, select = '', populate = '' } = options;

            const data = await this.model
                .findOne(cond, opts)
                .select(select)
                .populate(populate)
            return data
        } catch (error) {
            throw Error(error)
        }
    }

    async total(cond = {}) {
        return await this.model.countDocuments(cond);
    }
    // ************ UPDATE ************
    async updateOne(cond, query, opts={new: true }) {
        try {
            const data = await this.model.updateOne(cond, query, opts).exec()
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
    async updateMany(cond, query, opts={new: true }) {
        try {
            const data = await this.model.updateMany(cond, query, opts).exec()
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    // ************ CREATE ************
    async create(body, opts = {}) {
        try {
            const data = await this.model.insertOne(body, opts)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    async createOne(body, opts = {}) {
        try {
            const data = await this.model.insertMany(body, opts)
            return data[0]
        } catch (error) {
            // console.log(error)
            throw new Error(error)
        }
    }

    // ************ DELETE ************
    async deleteOne(cond, opts = {}) {
        try {
            const data = await this.model.deleteOne(cond, opts).exec()
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteMany(cond, opts = {}) {
        try {
            const data = await this.model.deleteMany(cond, opts).exec()
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = BaseModel