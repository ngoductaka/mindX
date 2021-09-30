class BaseModel {
    constructor(model) {
        this.model = model
    }

    async create(body, opts = {}) {
        try {
            const data = await this.model.insertMany(body, opts)
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async update(cond, body, opts={new: true }) {
        try {
            const data = await this.model.findOneAndUpdate(cond, { $set: body }, opts).exec()
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async delete(cond, opts = {}) {
        try {
            const data = await this.model.deleteOne(cond, opts).exec()
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async deleteMany(cond, opts = {}) {
        try {
            const data = await this.model.deleteMany(cond, opts).exec()
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findMany(cond, page = 1, limit = 20, sort = -1, opts = {}) {
        try {
            limit = parseInt(limit)
            page = parseInt(page)
            let skip = limit * (page - 1)
            const data = await this.model.find(cond, opts).skip(skip).limit(limit).sort({createdAt: sort}).exec()
            if(data==null){
                return []
            }
            return data
        } catch (error) {
            console.log(`findMany error = ${error}`)
            return null
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
            console.log(`findMany error = ${error}`)
            return null
        }
    }

    async findManyFrom(cond, from, sort = -1, opts = {}) {
        try {
            const data = await this.model.find(cond, opts).skip(from).sort({createdAt: sort}).exec()
            if(data==null){
                return []
            }
            return data
        } catch (error) {
            console.log(`findManyFrom error = ${error}`)
            return null
        }
    }

    async findManyWithSort(cond, page = 1, limit = 20, sort = { createdAt: -1 }, opts = {}) {
        try {
            limit = parseInt(limit)
            page = parseInt(page)
            let skip = limit * (page - 1)
            const data = await this.model.find(cond, opts).skip(skip).limit(limit).sort(sort).exec()
            if(data==null){
                return []
            }
            return data
        } catch (error) {
            console.log(`findMany error = ${error}`)
            return null
        }
    }


    async listDataTables(cond, start, length) {
        try {
            const data = await this.model.find(cond).sort({ createdAt: -1 }).skip(start).limit(length).exec()
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async findOne(cond,  opts = {}, populate='') {
        try {
            const data = await this.model.findOne(cond, opts).populate(populate).exec()
            return data
        } catch (error) {
            console.log(`findOne error `,error)
            return null
        }
    }

    async all(page = 1, limit = 20, opts = {}) {
        try {
            limit = parseInt(limit)
            page = parseInt(page)
            let skip = limit * (page - 1)
            const data = this.model.find({}, opts)
                .sort({ createdAt: -1 }) // 1 = asc , -1 = desc
                .skip(skip)
                .limit(limit)
            return data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async total(cond = {}) {
        return await this.model.countDocuments(cond);
    }
}

module.exports = BaseModel