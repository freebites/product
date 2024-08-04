interface GetTimeDifferenceProps {
  postTime: Date;
}

export const getTimeDifference = (props: GetTimeDifferenceProps) => {
  const { postTime } = props;
  const now = new Date();
  const postDate = new Date(postTime);
  const differenceInSeconds = Math.floor(
    (now.getTime() - postDate.getTime()) / 1000
  );

  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  }

  const differenceInMinutes = Math.floor(differenceInSeconds / 60);
  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minutes ago`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} hours ago`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays < 30) {
    return `${differenceInDays} days ago`;
  }

  const monthsDifference =
    now.getMonth() -
    postDate.getMonth() +
    12 * (now.getFullYear() - postDate.getFullYear());
  if (monthsDifference < 12) {
    return `${monthsDifference} month${monthsDifference > 1 ? "s" : ""} ago`;
  }

  const yearsDifference = Math.floor(monthsDifference / 12);
  return `${yearsDifference} year${yearsDifference > 1 ? "s" : ""} ago`;
};

export const pronounsOptions = [
  "co",
  "cos",
  "e",
  "ey",
  "em",
  "eir",
  "fae",
  "faee",
  "he",
  "him",
  "his",
  "she",
  "her",
  "hers",
  "mer",
  "mers",
  "ne",
  "nir",
  "nirs",
  "nee",
  "ner",
  "ners",
  "per",
  "pers",
  "they",
  "them",
  "theirs",
  "thon",
  "thons",
  "ve",
  "ver",
  "vis",
  "vi",
  "vir",
  "xe",
  "xem",
  "xyr",
  "ze",
  "zie",
  "zir",
  "hir",
];
