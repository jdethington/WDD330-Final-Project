export default class MovieDetails {
    constructor(movieId, dataSource) {
        this.movieId = movieId;
        this.movie = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.movie = await this.dataSource.findMovieById(this.movieId);

    }
}