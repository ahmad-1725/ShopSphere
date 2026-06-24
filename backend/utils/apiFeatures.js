class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // 🔍 SEARCH
  search() {
    if (this.queryStr.keyword) {
      this.query = this.query.find({
        name: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      });
    }
    return this;
  }

  // 🧩 FILTER
  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit", "sort"];
    removeFields.forEach((el) => delete queryCopy[el]);

    // price[gte]=100 → { price: { $gte: 100 } }
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // ↕ SORT
  sort() {
    if (this.queryStr.sort) {
      this.query = this.query.sort(this.queryStr.sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  // 📄 PAGINATION
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const limit = Number(this.queryStr.limit) || resultPerPage;

    const skip = limit * (currentPage - 1);

    this.query = this.query.limit(limit).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;