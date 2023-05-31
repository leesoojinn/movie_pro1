const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTJjNWMxYjA2MGQzMzIyMzBmZmJjMGFlYWI0ZjkzMiIsInN1YiI6IjY0NzU1YzMyYzI4MjNhMDBjNDIxNjQxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PDvxWjDfzLUY2-2pWzhfcgQ5ut8n4d3Bonr2Ue8xlPw",
  },
};
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  // map 함수를 사용하여 각 영화 정보를 movies 배열로 변환한다.
  .then((response) => response.json())
  .then((data) => {
    let rows = data.results;
    let movies = rows.map((row) => ({
      poster: row.poster_path,
      title: row.title,
      vote: row.vote_average,
      overview: row.overview,
      id: row.id,
    }));

    // 영화 카드를 생성하는 함수
    // createMovieCard --> 주어진 영화 정보를 바탕으로 영화 카드를 생성하는 역할
    const createMovieCard = (movie) => {
      return `<div class="movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster}" alt="The Godfather" onclick="alert('ID: ${movie.id}')"/>
                    
                    <div class="movie-info">
                      <h3>${movie.title}</h3>
                      <span class="star">${movie.vote}</span>
                    </div>
                
                    <div class="overview">
                      <p>${movie.overview}</p>
                    </div>
                </div>`;
    };

    // displayMovies  --> 영화 목록을 표시하는 함수
    // movies 배열을 순회하면서 각 영화에 대한 카드 html 생성하고,
    // cardsContainer 요소에 추가한다.
    // displayMovies 함수가 주어진 영화 목록 movies를 화면에 표시를 해준다.
    const displayMovies = (movies) => {
      const cardsContainer = document.querySelector("#cards");
      // 질문
      cardsContainer.innerHTML = "";

      movies.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        cardsContainer.innerHTML += movieCard;
      });
    };

    // 검색 이벤트 핸들러
    // handlesearch --> 검색 이벤트를 처리하는 함수
    // 이벤트 발생 시 검색어를 가져와서 movies 배열을 필터링하여 제목에 검색어가 포함된 영화만 나옴.
    // 그 후, displayMovies 함수를 사용하여 필터링된 영화 목록을 표시
    const handleSearch = (event) => {
      // 질문
      event.preventDefault();
      const searchInput = document
        .querySelector("#search-input")
        .value.toLowerCase();
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchInput)
      );
      displayMovies(filteredMovies);
    };

    // 초기 영화 목록 표시
    // displayMovies 함수에 movies 배열을 전달하고, 검색 버튼을 누르면 검색 기능이 활성화된다.
    displayMovies(movies);

    // 검색 버튼 클릭 이벤트 설정
    const searchButton = document.querySelector("#search-btn");
    searchButton.addEventListener("click", handleSearch);
  })
  .catch((err) => console.error(err));
