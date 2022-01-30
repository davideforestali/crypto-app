import { FC } from "react";
import styles from './AssetLogo.module.css'

interface AssetLogoProps {
  url?: string,
  assetName: string
}

const AssetLogo: FC<AssetLogoProps> = ({url, assetName}) => {
  return (
    <span className={styles.assetLogoContainer}>
      {url && <img src={url} alt={assetName + ' logo'} />}
    </span>
  )
}

export default AssetLogo