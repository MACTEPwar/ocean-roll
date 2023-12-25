class CommentService {
  currentComments = [];

  constructor() {}

  getMockComments(scCallback, erCallback) {
    $.ajax({
      url: "./data/comments.json",
      method: "GET",
      success: (data) => {
        scCallback(data);
      },
      error: (err) => {
        erCallback(err);
      },
    });
  }
}
