import { AssetsProps } from "./interfaces/shared";
import assetsLogos from './data/assetsLogos.json'

export const sortAssetsAlphabetically = (list: any) => {
  return [...list].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
};

export const sortAssetsByPrice = (list: any) => {
  return [...list].sort((a: AssetsProps, b: AssetsProps) => {
    return b.metrics.market_data.price_usd - a.metrics.market_data.price_usd
  })
}

export const getAssetLogoUrl = (assetName: string) => {
  const baseUrl = 'https://assets.coingecko.com/coins/images/'
  const matchingAsset = assetsLogos.find(asset => asset.name === assetName)
  return matchingAsset ? baseUrl + matchingAsset.url : undefined
}