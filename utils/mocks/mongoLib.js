const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllStub = sinon.stub();

getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ["Drama"] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

/*eslint-disable */
const createStub = sinon.stub().resolves(moviesMock[0].id); 
/*eslint-enable */