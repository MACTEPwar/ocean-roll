$(document).ready(() => {
  commentService.getMockComments((comments) => {
    let commentsDOM = comments
      .reduce((acc, currentValue, index) => {
        // Находим текущий подмассив в аккумуляторе
        let currentChunkIndex = Math.floor(index / 3);
        let currentChunk = acc[currentChunkIndex];

        // Если подмассив еще не существует, создаем его
        if (!currentChunk) {
          currentChunk = acc[currentChunkIndex] = [];
        }

        // Добавляем текущий элемент в подмассив
        currentChunk.push(currentValue);

        return acc;
      }, [])
      .map((m, ind) => {
        return `
        <div class="carousel-item ${ind === 0 ? "active" : ""}">
          <div class="row" style="padding: 4rem 82px;">
            ${m
              .map((mm) => {
                return `
                <div class="col-4">
                  <div class="card" style="padding: 10px;border-radius: 15px;box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.25);">
                    <div class="card-body p-0">
                      <div class="card-top d-flex">
                        <div class="card-name">${mm.name}</div>
                        <div class="card-raiting ml-auto">
                        ${`<img src="./images/empty_star.svg" width="25px" />`.repeat(
                          5 - mm.rating
                        )}
                          ${`<img src="./images/fill_star.svg" width="25px" />`.repeat(
                            mm.rating
                          )}
                          
                        </div>
                      </div>
                   
                      <p class="card-text">${mm.descr}</p>
                      <div class="w-100 d-flex">
                        <span class="ml-auto">${mm.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
              })
              .join("\n")}
          </div>
        </div>
      `;
      });
    $(".comments").html("");
    $(".comments").append(commentsDOM.join("\n"));
  });
});
