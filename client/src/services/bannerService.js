export const next = (
  bannerContainer,
  bannerImages,
  slideCount,
  setSlideCount
) => {
  bannerContainer.current.scrollLeft =
    bannerContainer.current.offsetWidth * slideCount;
  setSlideCount((slideCount + 1) % bannerImages.length);
};

export const prev = (
  bannerContainer,
  bannerImages,
  slideCount,
  setSlideCount
) => {
  const totalSlides = bannerImages.length;
  const width = bannerContainer.current.offsetWidth;

  const newIndex = slideCount === 1 ? totalSlides : slideCount - 1;

  bannerContainer.current.scrollLeft = (newIndex - 1) * width;

  setSlideCount(newIndex);
};
