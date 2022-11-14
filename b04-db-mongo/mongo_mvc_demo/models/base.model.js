
class BaseModel {
    constructor(model) {
        this.model = model
    }

    async create(body, opts = {}) {
        try {
            const data = await this.model.insertMany(body, opts)
            return data
        } catch (error) {
            // console.log(error)
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

    async findOneAndUpdate(cond, query, opts={new: true }) {
        try {
            const data = await this.model.findOneAndUpdate(cond, query, opts).exec()
            return data
        } catch (error) {
            throw new Error(error)
        }
    }
    async findAndModify(query, update, sort = {createdAt: -1}, upsert = true) {
        try {
            const data = await this.model.findAndModify({
                query: query,
                sort: sort,
                update: update,
                upsert: upsert
            }).exec()
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    async delete(cond, opts = {}) {
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

    async findMany(cond, page = 1, limit = 20, sort = { createdAt: -1 }, opts = {}, populate='', select='') {
        try {
            limit = parseInt(limit)
            page = parseInt(page)
            let skip = limit * (page - 1)
            const data = await this.model.find(cond, opts).skip(skip).limit(limit).populate(populate).sort(sort).select(select).exec()
            if(data==null){
                return []
            }
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    async findManyAndSelect(cond, select, page = 1, limit = 20, sort = -1) {
        try {
            limit = parseInt(limit)
            page = parseInt(page)
            let skip = limit * (page - 1)
            const data = await this.model.find(cond).skip(skip).limit(limit).select(select).sort({createdAt: sort}).exec()
            if(data==null){
                return []
            }
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    async findOne(cond,  opts = {}, populate='') {
        try {
            const data = await this.model.findOne(cond, opts).populate(populate)
            return data
        } catch (error) {
            throw Error(error)
        }
    }

    async total(cond = {}) {
        try {
            return await this.model.countDocuments(cond);
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = BaseModel
