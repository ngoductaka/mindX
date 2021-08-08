require('dotenv').config();

const modelArticles = require('../models/Articles');
const jwt = require('jsonwebtoken');

const errorMessage = require('../config').errorMessage


async function getArticlesById(req, res) {
    try{
        let listArticles = await modelArticles.getById(req.query, req.userId)
        res.json({
            "articles": listArticles,
            "articlesCount": listArticles.length
        })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in getArticlesById", err]))
    }
    
}

async function getArticlesBySlug(req, res) {
    try{
        let article = await modelArticles.getBySlug(req.params.slug)
        res.json({ "article": article })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in getArticlesBySlug", err]))
    }
}

async function createArticles(req, res) {
    try{
        let { title, description, body } = req.body.article;
        if (undefined === title || undefined === description || undefined === body) return res.status(401).json(errorMessage(["title, description, body is require"]))

        let article = await modelArticles.create(req.body.article, req.userId)
        res.json({ "article": article })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in getArticlesBySlug", err]))
    }
}

async function editArticles(req, res) {
    try{
        let { title, description, body } = req.body.article;
        let article = await modelArticles.edit({ title, description, body }, req.userId, req.params.slug)
        res.json({ "article": article })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in getArticlesBySlug", err]))
    }
}

async function deleteArticles(req, res) {
    try{
        let article = await modelArticles.deleteArticle(req.params.slug)
        res.json({ "article": article })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in getArticlesBySlug", err]))
    }
}

async function addComment(req, res) {
    let {body} = req.body.comment;
    if(!body) res.status(401).json(errorMessage(["body is required"]))
    try{
        let article = await modelArticles.addComments(req.body.comment, req.params.slug, req.userId )
        res.json({ "article": article })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in addComment", err]))
    }
}
module.exports = { getArticlesById, getArticlesBySlug, createArticles, editArticles, deleteArticles, addComment }