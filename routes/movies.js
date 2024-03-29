const express = require('express');
const MoviesService = require('../services/movies');
const joi = require('@hapi/joi');

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

function moviesApi(app) {
    const router = express.Router();
    app.use("/api/movies/", router);

    const moviesService = new MoviesService();

    router.get('/', async function (req, res, next) {
        try {
            const { tags } = req.query;

            const movies = await moviesService.getMovies({ tags });

            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        } catch (error) {
            next(error);
        }
    });

    router.get('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema }), 'params'), async function (req, res, next) {
        try {
            const { movieId } = req.params;

            const movie = await moviesService.getMovie({ movieId });

            res.status(200).json({
                data: movie,
                message: 'movie listed'
            })
        } catch (error) {
            next(error);
        }
    });

    router.post('/', validationHandler(createMovieSchema), async function (req, res, next) {
        try {
            const { body: movie } = req;

            const createMovies = await moviesService.createMovie({ movie });

            res.status(201).json({
                data: createMovies,
                message: 'movie created'
            })
        } catch (error) {
            next(error);
        }
    });

    router.put('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema }), 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
        try {
            const { movieId } = req.params;
            const { body: movie } = req;

            const updatedMovieId = await moviesService.updateMovie({ movieId, movie });

            res.status(200).json({
                data: updatedMovieId,
                message: 'movie update'
            })
        } catch (error) {
            next(error);
        }
    });

    router.delete('/:movieId', validationHandler(joi.object({ movieId: movieIdSchema }), 'params'), async function (req, res, next) {
        try {
            const { movieId } = req.params;

            const deletedMovieId = await moviesService.deleteMovie({ movieId });

            res.status(200).json({
                data: deletedMovieId,
                message: 'movie delete'
            })
        } catch (error) {
            next(error);
        }
    });
}

module.exports = moviesApi;