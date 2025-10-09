const RatingColor: Array<[number, string]> = [
  [4, "#C82020"],
  [6, "#777777"],
  [8, "#308E21"],
  [10, "#A59400"],
]

export const colorByRating = (rating: number) => {
  rating = Math.floor(rating)
  const resultDuples = RatingColor.find(elem => (elem[0] >= rating))
  if (resultDuples) return resultDuples[1]
}
