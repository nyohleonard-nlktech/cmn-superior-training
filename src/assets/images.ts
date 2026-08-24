import soapProductionImg from './images/soap_production_1787567070599.jpg';
import chocolateCraftImg from './images/chocolate_craft_1787567084584.jpg';
import chocolateProductionImg from './images/chocolate_production_1787567086817.jpg';
import cmnLogoImg from './images/cmn_logo_1787567055631.jpg';
import ovaltineMaltImg from './images/ovaltine_malt_1787567096754.jpg';
import rawMaterialsImg from './images/raw_materials_1787567125868.jpg';
import spaghettiMakingImg from './images/spaghetti_making_1787567110671.jpg';

export const APP_IMAGES = {
  soap_production: soapProductionImg,
  chocolate_craft: chocolateCraftImg,
  chocolate_production: chocolateProductionImg,
  cmn_logo: cmnLogoImg,
  ovaltine_malt: ovaltineMaltImg,
  raw_materials: rawMaterialsImg,
  spaghetti_making: spaghettiMakingImg,
};

export function resolveImage(keyOrUrl?: string | null): string {
  if (!keyOrUrl) return rawMaterialsImg;
  
  // If it's already a data URL or external URL
  if (keyOrUrl.startsWith('data:') || keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
    return keyOrUrl;
  }

  // Match by filename keyword
  if (keyOrUrl.includes('soap_production')) return soapProductionImg;
  if (keyOrUrl.includes('chocolate_craft')) return chocolateCraftImg;
  if (keyOrUrl.includes('chocolate_production')) return chocolateProductionImg;
  if (keyOrUrl.includes('cmn_logo') || keyOrUrl.includes('logo')) return cmnLogoImg;
  if (keyOrUrl.includes('ovaltine') || keyOrUrl.includes('malt')) return ovaltineMaltImg;
  if (keyOrUrl.includes('raw_materials')) return rawMaterialsImg;
  if (keyOrUrl.includes('spaghetti')) return spaghettiMakingImg;

  // If it's already a bundled asset path
  if (keyOrUrl.startsWith('/assets/')) return keyOrUrl;

  return rawMaterialsImg;
}
