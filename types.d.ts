export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  description: string;
  slug: {
    current: string
  };
  mainImage: {
    asset: {
      url: string
    }
  };
  body: [object]
}

export interface Work {
  _id: string;
  title: string;
  description: string;
  mainImage: {
    asset: {
      url: string
    }
  };
  link: string
}