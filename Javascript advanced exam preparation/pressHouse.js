function pressHouse() {
  class Article {
    constructor(title, content) {
      this.title = title;
      this.content = content;
    }

    toString() {
      return `Title: ${this.title}\nContent: ${this.content}`;
    }
  }

  class ShortReports extends Article {
    constructor(title, content, originalResearch) {
      super(title, content);

      if (content.length >= 150) {
        throw new Error(
          "Short reports content should be less then 150 symbols."
        );
      }

      if (
        !originalResearch.hasOwnProperty("title") ||
        !originalResearch.hasOwnProperty("author")
      ) {
        throw new Error("The original research should have author and title.");
      }
      this.originalResearch = originalResearch;
      this.comments = [];
    }

    addComment(comment) {
      this.comments.push(comment);
      return "The comment is added.";
    }

    toString() {
      let result = super.toString().split("\n");

      result.push(
        `Original Research: ${this.originalResearch.title} by ${this.originalResearch.author}`
      );
      if (this.comments.length > 0) {
        result.push("Comments:");
        this.comments.forEach((comment) => {
          result.push(comment);
        });
      }

      return result.join("\n");
    }
  }

  class BookReview extends Article {
    constructor(title, content, book) {
      super(title, content);
      this.book = book;
      this.clients = [];
    }
    addClient(clientName, orderDescription) {
      let client = this.clients.find(
        (c) =>
          c.clientName === clientName && c.orderDescription === orderDescription
      );
      if (client) {
        throw new Error("This client has already ordered this review.");
      }

      this.clients.push({ clientName, orderDescription });

      return `${clientName} has ordered a review for ${this.book.name}`;
    }

    toString() {
      let result = super.toString().split("\n");
      result.push(`Book: ${this.book.name}`);

      if (this.clients.length > 0) {
        result.push("Orders:");
        this.clients.forEach((client) => {
          result.push(`${client.clientName} - ${client.orderDescription}`);
        });
      }
      return result.join("\n");
    }
  }

  return { Article, ShortReports, BookReview };
}
