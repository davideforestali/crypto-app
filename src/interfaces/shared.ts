export interface AssetsProps {
  id: string,
  name: string;
  symbol: string;
  metrics: {
    market_data: {
      price_usd: number;
    };
  };
}

export interface InfinitePageProps {
  nextCursor: number | undefined;
  data: AssetsProps[];
  hasMore: boolean;
  /* page: {
  }; */
}
