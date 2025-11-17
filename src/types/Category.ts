export class Category {
  title: string
  topics: string[]
  constructor(title: string, topics: string[]) {
    this.title = title;
    this.topics = topics
  }

  serializeToString(): string {
    return `${this.title}[${this.topics.join(";")}]`;
  }
  static deserializeFromString(serialized: string): Category | null {
    try {
      return new Category(
        serialized.split("[")[0],
        serialized.split("[")[1].split(";"),
      )
    }
    catch(e) {
      console.log(e)
      return null
    }
  }


}